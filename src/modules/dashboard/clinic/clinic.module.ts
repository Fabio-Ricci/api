import { Module } from '@nestjs/common';

import { DashboardClinicController } from './clinic.controller';
import { DashboardClinicGuard } from './guards/dashboard-clinic.guard';
import { ClinicModule } from 'src/modules/clinic/clinic.module';

@Module({
  imports: [ClinicModule],
  controllers: [DashboardClinicController],
  providers: [DashboardClinicGuard],
})
export class DashboardClinicModule {}
