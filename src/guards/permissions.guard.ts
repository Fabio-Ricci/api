import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PERMISSIONS_KEY } from 'src/decorators/permissions.decorator';
import { Permission } from 'src/modules/user/permission.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }

    const { currentUser } = context.switchToHttp().getRequest<Request>();
    if (!currentUser) {
      return false;
    }

    if (currentUser.permissions.includes(Permission.SUPER_USER)) {
      return true;
    }

    return requiredPermissions.some((Permission) =>
      currentUser.permissions.includes(Permission),
    );
  }
}
