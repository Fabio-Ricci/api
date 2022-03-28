import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { Permission } from 'src/modules/admin/permission.enum';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }

    const { currentAdmin } = context.switchToHttp().getRequest<Request>();
    if (currentAdmin.permissions?.includes(Permission.ALL)) {
      return true;
    }
    return requiredPermissions.some((Permission) =>
      currentAdmin.permissions?.includes(Permission),
    );
  }
}
