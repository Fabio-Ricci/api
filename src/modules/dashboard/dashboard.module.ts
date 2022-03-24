import { Module } from '@nestjs/common';

import { DashboardAdminModule } from './admin/admin.module';
import { DashboardClinicModule } from './clinic/clinic.module';
import { DashboardAuthModule } from './auth/auth.module';

@Module({
  imports: [DashboardAuthModule, DashboardAdminModule, DashboardClinicModule],
})
export class DashboardModule {}
