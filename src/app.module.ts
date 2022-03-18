import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { DashboardModule } from './dashboard/dashboard.module';
import { MobileModule } from './mobile/mobile.module';

@Module({
  imports: [
    DashboardModule,
    MobileModule,
    RouterModule.register([
      {
        path: 'dashboard',
        module: DashboardModule,
      },
      {
        path: 'mobile',
        module: MobileModule,
      },
    ]),
  ],
})
export class AppModule {}
