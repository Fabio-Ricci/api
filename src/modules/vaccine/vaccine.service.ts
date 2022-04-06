import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicService } from '../clinic/clinic.service';
import { VaccineTypeService } from '../vaccine-type/vaccine-type.service';

import { Vaccine } from './vaccine.entity';

export interface UpdateVaccineAttributes
  extends Partial<
    Omit<
      Vaccine,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'clinic'
      | 'vaccineType'
      | 'logInsert'
      | 'logRemove'
      | 'logUpdate'
    >
  > {
  clinicId?: number;
  vaccineTypeId?: number;
}

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine) private repo: Repository<Vaccine>,
    private vaccineTypeService: VaccineTypeService,
    private clinicService: ClinicService,
  ) {}

  async create(payload: {
    name: string;
    clinicId: number;
    vaccineTypeId: number;
  }) {
    const clinic = await this.clinicService.findOne(payload.clinicId);
    if (!clinic) {
      throw new BadRequestException();
    }

    const vaccineType = await this.vaccineTypeService.findOne(
      payload.vaccineTypeId,
    );
    if (!vaccineType) {
      throw new BadRequestException();
    }

    const vaccine = this.repo.create({
      name: payload.name,
      clinic: clinic,
      vaccineType: vaccineType,
    });

    return await this.repo.save(vaccine);
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async getManyAndCount(options: {
    limit?: number;
    offset?: number;
    name?: string;
    clinicId?: number;
  }): Promise<[Vaccine[], number]> {
    let query = this.repo
      .createQueryBuilder('vaccine')
      .leftJoinAndSelect('vaccine.clinic', 'clinic')
      .leftJoinAndSelect('vaccine.vaccineType', 'vaccineType')
      .orderBy('vaccine.created_at', 'DESC')
      .where('1=1');

    if (options.name) {
      query = query.andWhere('vaccine.name = :name', { name: options.name });
    }

    if (options.clinicId) {
      query = query.andWhere('clinic.id = :id', { id: options.clinicId });
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
    if (attrs.vaccineTypeId) {
      const vaccineType = await this.vaccineTypeService.findOne(
        attrs.vaccineTypeId,
      );
      if (!vaccineType) {
        throw new BadRequestException();
      }
      Object.assign(vaccine, { vaccineType: vaccineType });
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
