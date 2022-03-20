import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AdminService } from 'src/modules/admin/admin.service';

export interface JwtPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'dashboard-jwt-auth',
) {
  constructor(private adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.DASHBOARD_JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const admin = await this.adminService.findOne(payload.sub);
    return admin;
  }
}
