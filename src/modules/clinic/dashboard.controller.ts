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
import { DashboardJwtAuthGuard } from '../auth/guards/dashboard-jwt-auth.guard';
import { ClinicService } from './clinic.service';
import { ClinicDto } from './dtos/clinic.dto';
import { CreateClinicRequestDto } from './dtos/create-clinic.dto';
import { UpdateClinicRequestDto } from './dtos/update-clinic.dto';

@UseGuards(DashboardJwtAuthGuard)
@Serialize(ClinicDto)
@Controller('dashboard/clinic')
export class DashboardClinicController {
  constructor(private clinicService: ClinicService) {}

  @Post()
  async createClinic(@Body() body: CreateClinicRequestDto) {
    return await this.clinicService.create(body.name);
  }

  @Get('/:id')
  async findClinic(@Param('id') id: string) {
    const clinic = await this.clinicService.findOne(parseInt(id));
    if (!clinic) {
      throw new NotFoundException();
    }
    return clinic;
  }

  @Get()
  async findAllClinics(@Query('name') name?: string) {
    return await this.clinicService.find(name);
  }

  @Delete('/:id')
  async deleteClinic(@Param('id') id: string) {
    return await this.clinicService.delete(parseInt(id));
  }

  @Patch('/:id')
  async updateClinic(
    @Param('id') id: string,
    @Body() body: UpdateClinicRequestDto,
  ) {
    return await this.clinicService.update(parseInt(id), body);
  }
}
