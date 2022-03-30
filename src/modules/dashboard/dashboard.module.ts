import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { DashboardAdminModule } from './admin/admin.module';
import { DashboardClinicModule } from './clinic/clinic.module';
import { DashboardAuthModule } from './auth/auth.module';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { DashboardJwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DashboardUserModule } from './user/user.module';
import { DashboardVaccineModule } from './vaccine/vaccine.module';

@Module({
  imports: [
    PassportModule.register({
      property: 'currentAdmin',
    }),
    DashboardAuthModule,
    DashboardAdminModule,
    DashboardClinicModule,
    DashboardUserModule,
    DashboardVaccineModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: DashboardJwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class DashboardModule {}
