import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';

import { Serialize } from 'src/interceptors/serialize.interceptor';

import { DashboardJwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { AdminService } from '../../admin/admin.service';
import { AdminDto } from './dtos/admin.dto';
import { CreateAdminRequestDto } from './dtos/create-admin.dto';
import { UpdateAdminRequestDto } from './dtos/update-admin.dto';

@Serialize(AdminDto)
@UseGuards(DashboardJwtAuthGuard)
@Controller('dashboard/admin')
export class DashboardAdminController {
  constructor(private adminService: AdminService) {}

  @Public()
  @Post()
  async createAdmin(@Body() body: CreateAdminRequestDto) {
    return await this.adminService.create(body.email, body.password);
  }

  @Get('/:id')
  async findAdmin(@Param('id') id: string) {
    const admin = await this.adminService.findOne(parseInt(id));
    if (!admin) {
      throw new NotFoundException();
    }
    return admin;
  }

  @Get()
  async findAllAdmins(@Query('email') email: string) {
    return await this.adminService.find(email);
  }

  @Delete('/:id')
  async deleteAdmin(@Param('id') id: string) {
    return await this.adminService.delete(parseInt(id));
  }

  @Patch('/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() body: UpdateAdminRequestDto,
  ) {
    return await this.adminService.update(parseInt(id), body);
  }
}
