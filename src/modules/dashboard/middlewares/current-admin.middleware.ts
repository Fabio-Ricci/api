import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AdminService } from 'src/modules/admin/admin.service';

@Injectable()
export class CurrentAdminMiddleware implements NestMiddleware {
  constructor(private adminService: AdminService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // // FIXME use JWT from authorization header
    // const { adminId } = req.session || {};

    // if (adminId) {
    //   const adminId = await this.adminService.findOne(adminId);
    //   req.currentAdmin = adminId;
    // }

    next();
  }
}
