import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ClinicModule } from '../clinic/clinic.module';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

@Module({
  imports: [ClinicModule, TypeOrmModule.forFeature([Admin])],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
