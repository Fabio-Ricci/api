import { Module } from '@nestjs/common';

import { AdminModule } from 'src/modules/admin/admin.module';
import { DashboardAdminController } from './admin.controller';

@Module({
  imports: [AdminModule],
  controllers: [DashboardAdminController],
})
export class DashboardAdminModule {}
