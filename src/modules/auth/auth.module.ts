import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from 'src/modules/admin/admin.module';
import { JwtStrategy } from 'src/strategies/dashboard-jwt-auth.strategy';
import { DashboardAuthController } from './dashboard.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.DASHBOARD_JWT_SECRET,
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [DashboardAuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
