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
} from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';

import { AdminService } from '../../admin/admin.service';
import { AdminDto } from './dtos/admin.dto';
import { CreateAdminRequestDto } from './dtos/create-admin.dto';
import { UpdateAdminRequestDto } from './dtos/update-admin.dto';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from 'src/modules/admin/permission.enum';

@Serialize(AdminDto)
@Controller('dashboard/admin')
export class DashboardAdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  @Permissions(Permission.CREATE_ADMIN)
  async createAdmin(@Body() body: CreateAdminRequestDto) {
    return await this.adminService.create(body.email, body.password);
  }

  @Permissions(Permission.GET_ADMIN)
  @Get('/:id')
  async findAdmin(@Param('id') id: string) {
    const admin = await this.adminService.findOne(parseInt(id));
    if (!admin) {
      throw new NotFoundException();
    }
    return admin;
  }

  @Permissions(Permission.GET_ADMINS)
  @Get()
  async findAdmins(@Query('email') email: string) {
    return await this.adminService.find(email);
  }

  @Permissions(Permission.DELETE_ADMIN)
  @Delete('/:id')
  async deleteAdmin(@Param('id') id: string) {
    return await this.adminService.delete(parseInt(id));
  }

  @Permissions(Permission.UPDATE_ADMIN)
  @Patch('/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() body: UpdateAdminRequestDto,
  ) {
    return await this.adminService.update(parseInt(id), body);
  }
}
