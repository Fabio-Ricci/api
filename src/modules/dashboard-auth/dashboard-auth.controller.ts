import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Admin } from 'src/modules/admin/admin.entity';
import { DashboardAuthService } from './dashboard-auth.service';
import { CurrentAdmin } from './decorators/current-admin.decorator';
import { AdminDto } from '../admin/dtos/admin.dto';
import {
  LoginAdminRequestDto,
  LoginAdminResponseDto,
} from './dtos/login-admin.dto';

import { Public } from 'src/decorators/public.decorator';
import { DashboardJwtAuthGuard } from './guards/dashboard-jwt-auth.guard';

@UseGuards(DashboardJwtAuthGuard)
@Controller('dashboard/auth')
export class DashboardAuthController {
  constructor(private dashboardAuthService: DashboardAuthService) {}

  @Public()
  @Post('login')
  async loginAdmin(
    @Body() body: LoginAdminRequestDto,
  ): Promise<LoginAdminResponseDto> {
    return await this.dashboardAuthService.login(body.email, body.password);
  }

  @Serialize(AdminDto)
  @Get('me')
  async getCurrentAdmin(@CurrentAdmin() admin: Admin) {
    return admin;
  }
}