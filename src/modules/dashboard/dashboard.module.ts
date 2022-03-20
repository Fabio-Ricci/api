import { Module } from '@nestjs/common';

import { DashboardAdminModule } from './admin/admin.module';

@Module({
  imports: [DashboardAdminModule],
})
export class DashboardModule {}
