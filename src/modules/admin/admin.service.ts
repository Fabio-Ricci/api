import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync } from 'crypto';
import { Repository } from 'typeorm';

import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private repo: Repository<Admin>) {}

  async create(email: string, password: string) {
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

  async find(email: string): Promise<Admin[]> {
    return await this.repo.find({ email: email });
  }

  async update(id: number, attrs: Partial<Admin>) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new BadRequestException();
    }
    Object.assign(admin, attrs);
    return await this.repo.save(admin);
  }

  async delete(id: number) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new BadRequestException();
    }
    return await this.repo.softDelete({ id: admin.id });
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
