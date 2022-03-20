import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminService } from 'src/modules/admin/admin.service';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class DashboardAuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const admin = await this.adminService.login(email, password);
    const payload = { sub: admin.id } as JwtPayload;
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async createAdmin(email: string, password: string) {
    const admin = await this.adminService.create(email, password);
    return admin;
  }
}
