import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/modules/user/user.service';
import { JwtPayload } from '../../guards/jwt-auth.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.login(email, password);
    const payload = { sub: user.id } as JwtPayload;
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
