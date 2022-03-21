import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Clinic } from './clinic.entity';
import { ClinicService } from './clinic.service';
import { DashboardClinicController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  controllers: [DashboardClinicController],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
