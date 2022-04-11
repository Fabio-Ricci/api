import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { Permission } from 'src/modules/admin/permission.enum';
import { VaccineService } from 'src/modules/vaccine/vaccine.service';

@Injectable()
export class DashboardVaccineGuard implements CanActivate {
  constructor(private vaccineService: VaccineService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { currentAdmin, params } = context
      .switchToHttp()
      .getRequest<Request>();

    if (currentAdmin.permissions.includes(Permission.SUPER_ADMIN)) {
      return true;
    }

    if (!params.id) {
      return false;
    }

    const vaccine = await this.vaccineService.findOne(parseInt(params.id));

    return currentAdmin.clinic?.id === vaccine.clinic.id;
  }
}
