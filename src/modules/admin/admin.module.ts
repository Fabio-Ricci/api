import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { DashboardAdminController } from './dashboard.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Admin])],
  controllers: [DashboardAdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
