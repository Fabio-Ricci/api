import { Module } from '@nestjs/common';

import { VaccineModule } from 'src/modules/vaccine/vaccine.module';
import { DashboardVaccineGuard } from './guards/dashboard-vaccine.guard';
import { DashboardVaccinesGuard } from './guards/dashboard-vaccines.guard';
import { DashboardVaccineController } from './vaccine.controller';

@Module({
  imports: [VaccineModule],
  controllers: [DashboardVaccineController],
  providers: [DashboardVaccineGuard, DashboardVaccinesGuard],
})
export class DashboardVaccineModule {}
