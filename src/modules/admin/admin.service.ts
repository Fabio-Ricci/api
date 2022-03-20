import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync } from 'crypto';
import { Repository } from 'typeorm';

import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private repo: Repository<Admin>) {}

  async create(email: string, password: string): Promise<Admin> {
    // See if email is in use
    const existingAdmin = await this.findOneByEmail(email);
    if (existingAdmin) {
      throw new BadRequestException();
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
    return this.repo.save(admin);
  }

  async findOne(id: number): Promise<Admin> {
    return this.repo.findOne(id);
  }

  async findOneByEmail(email: string): Promise<Admin> {
    return this.repo.findOne({
      where: {
        email: email,
      },
    });
  }

  async find(): Promise<Admin[]> {
    return this.repo.find();
  }

  async update(id: number, attrs: Partial<Admin>): Promise<Admin> {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    Object.assign(admin, attrs);
    return this.repo.save(admin);
  }

  async remove(id: number): Promise<Admin> {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    return this.repo.remove(admin);
  }

  async login(email: string, password: string) {
    const admin = await this.findOneByEmail(email);
    if (!admin) {
      throw new BadRequestException();
    }

    const [salt, storedHash] = admin.hashPassword.split('.');

    const hash = scryptSync(password, salt, 32);

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException();
    }

    return admin;
  }
}
