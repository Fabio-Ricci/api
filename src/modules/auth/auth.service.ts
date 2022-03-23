import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminService } from 'src/modules/admin/admin.service';
import { DashboardJwtPayload } from './guards/dashboard-jwt-auth.strategy';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async loginAdmin(email: string, password: string) {
    const admin = await this.adminService.login(email, password);
    const payload = { sub: admin.id } as DashboardJwtPayload;
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
