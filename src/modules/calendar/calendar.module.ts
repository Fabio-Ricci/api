import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClinicModule } from '../clinic/clinic.module';
import { Calendar } from './calendar.entity';
import { CalendarService } from './calendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Calendar]), ClinicModule],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
