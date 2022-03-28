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

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ClinicService } from '../../clinic/clinic.service';
import { ClinicDto } from './dtos/clinic.dto';
import { CreateClinicRequestDto } from './dtos/create-clinic.dto';
import { UpdateClinicRequestDto } from './dtos/update-clinic.dto';
import { DashboardClinicGuard } from './guards/dashboard-clinic.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from 'src/modules/admin/permission.enum';

@Serialize(ClinicDto)
@Controller('dashboard/clinic')
export class DashboardClinicController {
  constructor(private clinicService: ClinicService) {}

  @Permissions(Permission.CREATE_CLINIC)
  @Post()
  async createClinic(@Body() body: CreateClinicRequestDto) {
    return await this.clinicService.create(body.name);
  }

  @UseGuards(DashboardClinicGuard)
  @Permissions(Permission.GET_CLINIC)
  @Get('/:id')
  async findClinic(@Param('id') id: string) {
    const clinic = await this.clinicService.findOne(parseInt(id));
    if (!clinic) {
      throw new NotFoundException();
    }
    return clinic;
  }

  @Get()
  @Permissions(Permission.GET_CLINICS)
  async findClinics(@Query('name') name?: string) {
    return await this.clinicService.find(name);
  }

  @UseGuards(DashboardClinicGuard)
  @Permissions(Permission.DELETE_CLINIC)
  @Delete('/:id')
  async deleteClinic(@Param('id') id: string) {
    return await this.clinicService.delete(parseInt(id));
  }

  @UseGuards(DashboardClinicGuard)
  @Permissions(Permission.UPDATE_CLINIC)
  @Patch('/:id')
  async updateClinic(
    @Param('id') id: string,
    @Body() body: UpdateClinicRequestDto,
  ) {
    return await this.clinicService.update(parseInt(id), body);
  }
}
