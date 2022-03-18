import { Module } from '@nestjs/common';

import { UserModule } from 'src/modules/user/user.module';

import { MobileAuthController } from './mobile-auth/mobile-auth.controller';

@Module({
  imports: [UserModule],
  controllers: [MobileAuthController],
})
export class MobileModule {}
