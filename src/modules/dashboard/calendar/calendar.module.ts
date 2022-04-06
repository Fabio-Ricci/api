import { Module } from '@nestjs/common';

import { CalendarModule } from 'src/modules/calendar/calendar.module';
import { DashboardCalendarController } from './calendar.controller';
import { DashboardCalendarGuard } from './guards/dashboard-calendar.guard';
import { DashboardCalendarsGuard } from './guards/dashboard-calendars.guard';

@Module({
  imports: [CalendarModule],
  controllers: [DashboardCalendarController],
  providers: [DashboardCalendarGuard, DashboardCalendarsGuard],
})
export class DashboardCalendarModule {}
