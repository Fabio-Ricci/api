import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardClinicGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { currentAdmin, params } = context
      .switchToHttp()
      .getRequest<Request>();

    // FIXME add condition to check for super admin

    return currentAdmin.clinic?.id === parseInt(params.id);
  }
}
