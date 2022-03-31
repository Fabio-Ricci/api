import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vaccine } from './vaccine.entity';

export type UpdateVaccineAttributes = Partial<
  Omit<
    Vaccine,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'clinic'
    | 'logInsert'
    | 'logRemove'
    | 'logUpdate'
  >
>;

@Injectable()
export class VaccineService {
  constructor(@InjectRepository(Vaccine) private repo: Repository<Vaccine>) {}

  async create(name: string) {
    const user = this.repo.create({
      name: name,
    });

    return await this.repo.save(user);
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async getManyAndCount(options: {
    limit?: number;
    offset?: number;
    name?: string;
  }): Promise<[Vaccine[], number]> {
    let query = this.repo
      .createQueryBuilder('vaccine')
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

  async update(id: number, attrs: UpdateVaccineAttributes) {
    const vaccine = await this.findOne(id);
    if (!vaccine) {
      throw new NotFoundException();
    }
    Object.assign(vaccine, attrs);
    return await this.repo.save(vaccine);
  }

  async delete(id: number) {
    const vaccine = await this.findOne(id);
    if (!vaccine) {
      throw new NotFoundException();
    }
    return await this.repo.remove(vaccine);
  }
}
