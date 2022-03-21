import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Admin } from 'src/modules/admin/admin.entity';
import { AuthService } from './auth.service';
import { CurrentAdmin } from '../../decorators/current-admin.decorator';
import { AdminDto } from '../admin/dtos/admin.dto';
import {
  LoginAdminRequestDto,
  LoginAdminResponseDto,
} from './dtos/login-admin.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('dashboard/auth')
export class DashboardAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async loginAdmin(
    @Body() body: LoginAdminRequestDto,
  ): Promise<LoginAdminResponseDto> {
    return await this.authService.loginAdmin(body.email, body.password);
  }

  @Serialize(AdminDto)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentAdmin(@CurrentAdmin() admin: Admin) {
    return admin;
  }
}
