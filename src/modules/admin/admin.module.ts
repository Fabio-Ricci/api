import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardAuthModule } from '../dashboard-auth/dashboard-auth.module';

import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { DashboardAdminController } from './dashboard.controller';

@Module({
  imports: [DashboardAuthModule, TypeOrmModule.forFeature([Admin])],
  controllers: [DashboardAdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
