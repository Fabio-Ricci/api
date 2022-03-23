import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { DashboardUserController } from './dashboard.controller';
import { DashboardAuthModule } from '../dashboard-auth/dashboard-auth.module';

@Module({
  imports: [DashboardAuthModule, TypeOrmModule.forFeature([User])],
  controllers: [DashboardUserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
