import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { VaccineService } from './vaccine.service';
import { Vaccine } from './vaccine.entity';
import { VaccineTypeModule } from '../vaccine-type/vaccine-type.module';
import { ClinicModule } from '../clinic/clinic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vaccine]),
    ClinicModule,
    VaccineTypeModule,
  ],
  providers: [VaccineService],
  exports: [VaccineService],
})
export class VaccineModule {}
