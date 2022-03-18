import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private repo: Repository<Admin>) {}

  create(email: string, hash_password: string) {
    const admin = this.repo.create({
      email: email,
      hash_password: hash_password,
    });

    return this.repo.save(admin);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<Admin>) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    Object.assign(admin, attrs);
    return this.repo.save(admin);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    return this.repo.remove(admin);
  }
}
