import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardAuthModule } from '../auth/auth.module';
import { Clinic } from '../../clinic/clinic.entity';
import { ClinicService } from '../../clinic/clinic.service';
import { DashboardClinicController } from './clinic.controller';
import { DashboardClinicGuard } from './guards/dashboard-clinic.guard';
import { ClinicModule } from 'src/modules/clinic/clinic.module';

@Module({
  imports: [
    DashboardAuthModule,
    ClinicModule,
    PassportModule.register({
      property: 'currentAdmin',
    }),
    TypeOrmModule.forFeature([Clinic]),
  ],
  controllers: [DashboardClinicController],
  providers: [ClinicService, DashboardClinicGuard],
  exports: [ClinicService],
})
export class DashboardClinicModule {}
