import { Module } from '@nestjs/common';

import { DashboardAuthModule } from './auth/auth.module';

@Module({
  imports: [DashboardAuthModule],
})
export class DashboardModule {}
