import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicService } from '../clinic/clinic.service';

import { Calendar } from './calendar.entity';

export type UpdateCalendarAttributes = Partial<
  Omit<
    Calendar,
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
export class CalendarService {
  constructor(
    @InjectRepository(Calendar) private repo: Repository<Calendar>,
    private clinicService: ClinicService,
  ) {}

  async create(payload: {
    name: string;
    calendarType: string;
    clinicId: number;
  }) {
    const clinic = await this.clinicService.findOne(payload.clinicId);
    if (!clinic) {
      throw new BadRequestException();
    }

    const calendar = this.repo.create({
      name: payload.name,
      calendarType: payload.calendarType,
      clinic: clinic,
    });

    return await this.repo.save(calendar);
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }

  async getManyAndCount(options: {
    limit?: number;
    offset?: number;
    name?: string;
    calendarType?: string;
    clinicId?: number;
  }): Promise<[Calendar[], number]> {
    let query = this.repo
      .createQueryBuilder('calendar')
      .leftJoinAndSelect('calendar.clinic', 'clinic')
      .orderBy('calendar.created_at', 'DESC')
      .where('1=1');

    if (options.name) {
      query = query.andWhere('calendar.name = :name', {
        name: options.name,
      });
    }

    if (options.calendarType) {
      query = query.andWhere('calendar.calendarType = :calendarType', {
        calendarType: options.calendarType,
      });
    }

    if (options.clinicId) {
      query = query.andWhere('clinic.id = :id', {
        id: options.clinicId,
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

  async update(id: number, attrs: UpdateCalendarAttributes) {
    const calendar = await this.findOne(id);
    if (!calendar) {
      throw new NotFoundException();
    }
    Object.assign(calendar, attrs);
    return await this.repo.save(calendar);
  }

  async delete(id: number) {
    const calendar = await this.findOne(id);
    if (!calendar) {
      throw new NotFoundException();
    }
    return await this.repo.remove(calendar);
  }
}
