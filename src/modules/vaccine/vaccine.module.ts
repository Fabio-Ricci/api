import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { VaccineService } from './vaccine.service';
import { Vaccine } from './vaccine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  providers: [VaccineService],
  exports: [VaccineService],
})
export class VaccineModule {}
