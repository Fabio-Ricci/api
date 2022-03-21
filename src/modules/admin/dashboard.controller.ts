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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

import { Serialize } from 'src/interceptors/serialize.interceptor';

import { AdminService } from './admin.service';
import { AdminDto } from './dtos/admin.dto';
import { CreateAdminRequestDto } from './dtos/create-admin.dto';
import { UpdateAdminRequestDto } from './dtos/update-admin.dto';

@Serialize(AdminDto)
@Controller('dashboard/admin')
export class DashboardAdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  async createAdmin(@Body() body: CreateAdminRequestDto) {
    return await this.adminService.create(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findAdmin(@Param('id') id: string) {
    const admin = await this.adminService.findOne(parseInt(id));
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    return admin;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllAdmins(@Query('email') email: string) {
    return await this.adminService.find(email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteAdmin(@Param('id') id: string) {
    return await this.adminService.delete(parseInt(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() body: UpdateAdminRequestDto,
  ) {
    return await this.adminService.update(parseInt(id), body);
  }
}
