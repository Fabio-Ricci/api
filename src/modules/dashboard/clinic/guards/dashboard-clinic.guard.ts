import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { Permission } from 'src/modules/admin/permission.enum';

@Injectable()
export class DashboardClinicGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { currentAdmin, params } = context
      .switchToHttp()
      .getRequest<Request>();

    if (currentAdmin.permissions.includes(Permission.ALL)) {
      return true;
    }

    return currentAdmin.clinic?.id === parseInt(params.id);
  }
}
