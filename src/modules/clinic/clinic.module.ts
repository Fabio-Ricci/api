import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { Clinic } from './clinic.entity';
import { ClinicService } from './clinic.service';
import { DashboardClinicController } from './dashboard.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Clinic])],
  controllers: [DashboardClinicController],
  providers: [ClinicService],
  exports: [ClinicService],
})
export class ClinicModule {}
