import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Clinic } from './clinic.entity';

export type UpdateClinicAttributes = Partial<
  Omit<
    Clinic,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'admins'
    | 'vaccines'
    | 'calendars'
    | 'logInsert'
    | 'logRemove'
    | 'logUpdate'
  >
>;

@Injectable()
export class ClinicService {
  constructor(@InjectRepository(Clinic) private repo: Repository<Clinic>) {}

  async create(name: string) {
    // Create a new clinic and save it
    const clinic = this.repo.create({
      name: name,
    });

    // return the clinic
    return await this.repo.save(clinic);
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async getManyAndCount(options: {
    limit?: number;
    offset?: number;
    name?: string;
  }): Promise<[Clinic[], number]> {
    let query = this.repo
      .createQueryBuilder('clinic')
      .orderBy('created_at', 'DESC')
      .where('1=1');

    if (options.name) {
      query = query.andWhere('name = :name', { name: options.name });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    return query.getManyAndCount();
  }

  async update(id: number, attrs: UpdateClinicAttributes) {
    const clinic = await this.findOne(id);
    if (!clinic) {
      throw new NotFoundException();
    }
    Object.assign(clinic, attrs);
    return await this.repo.save(clinic);
  }

  async delete(id: number) {
    const clinic = await this.findOne(id);
    if (!clinic) {
      throw new NotFoundException();
    }
    return await this.repo.remove(clinic);
  }
}
