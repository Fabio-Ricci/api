import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AdminModule } from 'src/modules/admin/admin.module';
import { DashboardJwtStrategy } from './guards/dashboard-jwt-auth.strategy';
import { DashboardAuthController } from './dashboard-auth.controller';
import { DashboardAuthService } from './dashboard-auth.service';
import { DashboardJwtAuthGuard } from './guards/dashboard-jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => AdminModule), // avoid circular dependency
    PassportModule.register({
      property: 'currentAdmin',
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.DASHBOARD_JWT_SECRET,
        signOptions: { expiresIn: '10h' },
      }),
    }),
  ],
  controllers: [DashboardAuthController],
  providers: [
    DashboardAuthService,
    DashboardJwtAuthGuard,
    DashboardJwtStrategy,
  ],
  exports: [DashboardAuthService],
})
export class DashboardAuthModule {}
