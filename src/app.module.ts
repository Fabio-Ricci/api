import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(),
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
    UserModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
