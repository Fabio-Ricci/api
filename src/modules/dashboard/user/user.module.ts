import { Module } from '@nestjs/common';

import { UserModule } from 'src/modules/user/user.module';
import { DashboardUserController } from './user.controller';

@Module({
  imports: [UserModule],
  controllers: [DashboardUserController],
})
export class DashboardUserModule {}
