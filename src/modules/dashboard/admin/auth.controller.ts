import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Admin } from 'src/modules/admin/admin.entity';
import { DashboardAuthService } from './auth.service';
import { CurrentAdmin } from './decorators/current-admin.decorator';
import { AdminDto } from './dtos/admin.dto';
import { CreateAdminRequestDto } from './dtos/create-admin.dto';
import {
  LoginAdminRequestDto,
  LoginAdminResponseDto,
} from './dtos/login-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('dashboard/auth')
export class DashboardAuthController {
  constructor(private dashboardAuthService: DashboardAuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginAdminRequestDto,
  ): Promise<LoginAdminResponseDto> {
    return await this.dashboardAuthService.login(body.email, body.password);
  }

  @Serialize(AdminDto)
  @Post()
  async createAdmin(@Body() body: CreateAdminRequestDto) {
    return await this.dashboardAuthService.createAdmin(
      body.email,
      body.password,
    );
  }

  @Serialize(AdminDto)
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentAdmin() admin: Admin) {
    return admin;
  }
}
