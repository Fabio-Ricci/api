import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './clinic.entity';

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

  async find(name: string): Promise<Clinic[]> {
    return await this.repo.find({ name: name });
  }

  async update(id: number, attrs: Partial<Clinic>) {
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
