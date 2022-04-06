import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from 'src/modules/admin/permission.enum';
import { CalendarService } from 'src/modules/calendar/calendar.service';
import { CalendarDto } from './dtos/calendar.dto';
import { CreateCalendarRequestDto } from './dtos/create-calendar.dto';
import { UpdateCalendarRequestDto } from './dtos/update-calendar.dto';
import { DashboardCalendarGuard } from './guards/dashboard-calendar.guard';
import { DashboardCalendarsGuard } from './guards/dashboard-calendars.guard';

@Serialize(CalendarDto)
@Controller('dashboard/calendar')
export class DashboardCalendarController {
  constructor(private calendarService: CalendarService) {}

  @Permissions(Permission.CREATE_CALENDAR)
  @Post()
  async createCalendar(@Body() body: CreateCalendarRequestDto) {
    return await this.calendarService.create(body);
  }

  @UseGuards(DashboardCalendarGuard)
  @Permissions(Permission.GET_CALENDAR)
  @Get('/:id')
  async findCalendar(@Param('id') id: string) {
    const calendar = await this.calendarService.findOne(parseInt(id));
    if (!calendar) {
      throw new NotFoundException();
    }
    return calendar;
  }

  @UseGuards(DashboardCalendarsGuard)
  @Permissions(Permission.GET_CALENDARS)
  @Get()
  async findCalendars(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('name') name?: string,
    @Query('clinicId') clinicId?: number,
  ) {
    return await this.calendarService.getManyAndCount({
      limit: parseInt(limit),
      offset: parseInt(offset),
      name: name,
      clinicId: clinicId,
    });
  }

  @UseGuards(DashboardCalendarGuard)
  @Permissions(Permission.DELETE_CALENDAR)
  @Delete('/:id')
  async deleteCalendar(@Param('id') id: string) {
    return await this.calendarService.delete(parseInt(id));
  }

  @UseGuards(DashboardCalendarGuard)
  @Permissions(Permission.UPDATE_CALENDAR)
  @Patch('/:id')
  async updateCalendar(
    @Param('id') id: string,
    @Body() body: UpdateCalendarRequestDto,
  ) {
    return await this.calendarService.update(parseInt(id), body);
  }
}
