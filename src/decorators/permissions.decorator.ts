import { SetMetadata } from '@nestjs/common';
import { Permission } from 'src/modules/user/permission.enum';

export const PERMISSIONS_KEY = 'Permissions';
export const Permissions = (...Permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, Permissions);
