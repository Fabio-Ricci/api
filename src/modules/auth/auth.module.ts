import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from 'src/modules/admin/admin.module';
import { DashboardJwtStrategy } from './guards/dashboard-jwt-auth.strategy';
import { DashboardAuthController } from './dashboard.controller';
import { AuthService } from './auth.service';
import { DashboardJwtAuthGuard } from './guards/dashboard-jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => AdminModule), // avoid circular dependency
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.DASHBOARD_JWT_SECRET,
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [DashboardAuthController],
  providers: [AuthService, DashboardJwtAuthGuard, DashboardJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
