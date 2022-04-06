import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { Permission } from 'src/modules/admin/permission.enum';
import { CalendarService } from 'src/modules/calendar/calendar.service';

@Injectable()
export class DashboardCalendarGuard implements CanActivate {
  constructor(private calendarService: CalendarService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { currentAdmin, params } = context
      .switchToHttp()
      .getRequest<Request>();

    if (currentAdmin.permissions.includes(Permission.ALL)) {
      return true;
    }

    if (!params.id) {
      return false;
    }

    const calendar = await this.calendarService.findOne(parseInt(params.id));

    return currentAdmin.clinic?.id === calendar.clinic.id;
  }
}
