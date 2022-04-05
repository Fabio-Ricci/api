import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VaccineType } from './vaccine-type.entity';
import { VaccineTypeService } from './vaccine-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineType])],
  providers: [VaccineTypeService],
  exports: [VaccineTypeService],
})
export class VaccineTypeModule {}
