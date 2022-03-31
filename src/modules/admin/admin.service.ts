import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync } from 'crypto';
import { Repository } from 'typeorm';
import { ClinicService } from '../clinic/clinic.service';

import { Admin } from './admin.entity';

export interface UpdateAdminAttributes
  extends Partial<
    Omit<
      Admin,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'clinic'
      | 'hashPassword'
      | 'logInsert'
      | 'logRemove'
      | 'logUpdate'
    >
  > {
  clinicId: number;
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private repo: Repository<Admin>,
    private clinicService: ClinicService,
  ) {}

  async create(email: string, password: string) {
    // See if email is in use
    const existingAdmin = await this.findOneByEmail(email);
    if (existingAdmin) {
      throw new NotFoundException();
    }

    // Hash the admins password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = scryptSync(password, salt, 32);

    // Join the hashed result and the salt together
    const hashPassword = salt + '.' + hash.toString('hex');

    // Create a new admin and save it
    const admin = this.repo.create({
      email: email,
      hashPassword: hashPassword,
    });

    // return the admin
    return await this.repo.save(admin);
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOne({
      where: {
        email: email,
      },
    });
  }

  async getManyAndCount(options: {
    limit?: number;
    offset?: number;
    email?: string;
  }): Promise<[Admin[], number]> {
    let query = this.repo
      .createQueryBuilder('admin')
      .leftJoinAndSelect('admin.clinic', 'clinic')
      .orderBy('admin.created_at', 'DESC')
      .where('1=1');

    if (options.email) {
      query = query.andWhere('admin.email = :email', { email: options.email });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    return query.getManyAndCount();
  }

  async update(id: number, attrs: UpdateAdminAttributes) {
    let admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException();
    }
    if (attrs.email) {
      admin = await this.findOneByEmail(attrs.email);
      if (admin && id !== admin.id) {
        throw new ConflictException();
      }
    }
    if (attrs.clinicId) {
      const clinic = await this.clinicService.findOne(attrs.clinicId);
      if (!clinic) {
        throw new BadRequestException();
      }
      Object.assign(admin, { clinic: clinic });
    } else if (attrs.clinicId === null) {
      Object.assign(admin, { clinic: null });
    }

    Object.assign(admin, attrs);
    return await this.repo.save(admin);
  }

  async delete(id: number) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException();
    }
    return await this.repo.remove(admin);
  }

  async login(email: string, password: string) {
    const admin = await this.findOneByEmail(email);
    if (!admin) {
      throw new NotFoundException();
    }

    const [salt, storedHash] = admin.hashPassword.split('.');

    const hash = scryptSync(password, salt, 32);

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException();
    }

    return admin;
  }
}
