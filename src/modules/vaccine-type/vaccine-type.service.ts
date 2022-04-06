import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VaccineType } from './vaccine-type.entity';

export type UpdateVaccineTypeAttributes = Partial<
  Omit<
    VaccineType,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'vaccines'
    | 'logInsert'
    | 'logRemove'
    | 'logUpdate'
  >
>;

@Injectable()
export class VaccineTypeService {
  constructor(
    @InjectRepository(VaccineType) private repo: Repository<VaccineType>,
  ) {}

  async create(name: string) {
    const vaccineType = this.repo.create({
      name: name,
    });

    return await this.repo.save(vaccineType);
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async getManyAndCount(options: {
    limit?: number;
    offset?: number;
    name?: string;
  }): Promise<[VaccineType[], number]> {
    let query = this.repo
      .createQueryBuilder('vaccineType')
      .orderBy('vaccineType.created_at', 'DESC')
      .where('1=1');

    if (options.name) {
      query = query.andWhere('vaccineType.name = :name', {
        name: options.name,
      });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    return query.getManyAndCount();
  }

  async update(id: number, attrs: UpdateVaccineTypeAttributes) {
    const vaccineType = await this.findOne(id);
    if (!vaccineType) {
      throw new NotFoundException();
    }
    Object.assign(vaccineType, attrs);
    return await this.repo.save(vaccineType);
  }

  async delete(id: number) {
    const vaccineType = await this.findOne(id);
    if (!vaccineType) {
      throw new NotFoundException();
    }
    return await this.repo.remove(vaccineType);
  }
}
