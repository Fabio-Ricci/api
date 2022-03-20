import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from 'src/modules/admin/admin.module';

import { DashboardAuthController } from './auth.controller';
import { DashboardAuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.DASHBOARD_JWT_SECRET,
        // signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [DashboardAuthController],
  providers: [DashboardAuthService, JwtStrategy],
})
export class DashboardAuthModule {}
