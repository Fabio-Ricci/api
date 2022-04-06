import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import { Permission } from 'src/modules/admin/permission.enum';

@Injectable()
export class DashboardCalendarsGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { currentAdmin, query } = context
      .switchToHttp()
      .getRequest<Request>();

    if (currentAdmin.permissions.includes(Permission.ALL)) {
      return true;
    }

    if (!query.clinicId) {
      throw new BadRequestException('clinicId required');
    }

    return currentAdmin.clinic?.id === parseFloat(query.clinicId as string);
  }
}
