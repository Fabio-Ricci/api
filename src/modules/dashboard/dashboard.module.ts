import { Module } from '@nestjs/common';

import { AdminModule } from 'src/modules/admin/admin.module';

import { DashboardAdminController } from 'src/modules/dashboard/dashboard-admin/dashboard-admin.controller';
import { DashboardAuthController } from 'src/modules/dashboard/dashboard-auth/dashboard-auth.controller';

@Module({
  imports: [AdminModule],
  controllers: [DashboardAuthController, DashboardAdminController],
})
export class DashboardModule {}
