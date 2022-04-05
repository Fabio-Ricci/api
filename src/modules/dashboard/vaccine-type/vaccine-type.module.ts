import { Module } from '@nestjs/common';

import { VaccineTypeModule } from 'src/modules/vaccine-type/vaccine-type.module';
import { DashboardVaccineTypeController } from './vaccine-type.controller';

@Module({
  imports: [VaccineTypeModule],
  controllers: [DashboardVaccineTypeController],
})
export class DashboardVaccineTypeModule {}
