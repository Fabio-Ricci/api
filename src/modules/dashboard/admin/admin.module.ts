import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardAuthModule } from '../auth/auth.module';

import { AdminModule } from 'src/modules/admin/admin.module';
import { Admin } from '../../admin/admin.entity';
import { AdminService } from '../../admin/admin.service';
import { DashboardAdminController } from './admin.controller';

@Module({
  imports: [
    DashboardAuthModule,
    AdminModule,
    PassportModule.register({
      property: 'currentAdmin',
    }),
    TypeOrmModule.forFeature([Admin]),
  ],
  controllers: [DashboardAdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class DashboardAdminModule {}
