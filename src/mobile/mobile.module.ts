import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import { MobileAuthController } from './mobile-auth.controller';

@Module({
  controllers: [MobileAuthController],
  providers: [UserService],
})
export class MobileModule {}
