import { Module } from '@nestjs/common';

import { AdminService } from 'src/admin/admin.service';

import { DashboardAdminController } from 'src/dashboard/dashboard-admin.controller';

import { DashboardAuthController } from 'src/dashboard/dashboard-auth.controller';

@Module({
  controllers: [DashboardAuthController, DashboardAdminController],
  providers: [AdminService],
})
export class DashboardModule {}
