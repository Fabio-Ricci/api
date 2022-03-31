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
import { VaccineDto } from './dtos/vaccine.dto';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from 'src/modules/admin/permission.enum';
import { VaccineService } from 'src/modules/vaccine/vaccine.service';
import { CreateClinicRequestDto } from '../clinic/dtos/create-clinic.dto';
import { UpdateClinicRequestDto } from '../clinic/dtos/update-clinic.dto';
import { DashboardVaccineGuard } from './guards/dashboard-vaccine.guard';

@Serialize(VaccineDto)
@Controller('dashboard/vaccine')
export class DashboardVaccineController {
  constructor(private vaccineService: VaccineService) {}

  @UseGuards(DashboardVaccineGuard)
  @Permissions(Permission.CREATE_VACCINE)
  @Post()
  async createVaccine(@Body() body: CreateClinicRequestDto) {
    return await this.vaccineService.create(body.name);
  }

  @UseGuards(DashboardVaccineGuard)
  @Permissions(Permission.GET_VACCINE)
  @Get('/:id')
  async findClinic(@Param('id') id: string) {
    const clinic = await this.vaccineService.findOne(parseInt(id));
    if (!clinic) {
      throw new NotFoundException();
    }
    return clinic;
  }

  @Permissions(Permission.GET_VACCINES)
  @Get()
  async findClinics(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('name') name: string,
  ) {
    return await this.vaccineService.getManyAndCount({
      limit: parseInt(limit),
      offset: parseInt(offset),
      name: name,
    });
  }

  @UseGuards(DashboardVaccineGuard)
  @Permissions(Permission.DELETE_VACCINE)
  @Delete('/:id')
  async deleteClinic(@Param('id') id: string) {
    return await this.vaccineService.delete(parseInt(id));
  }

  @UseGuards(DashboardVaccineGuard)
  @Permissions(Permission.UPDATE_VACCINE)
  @Patch('/:id')
  async updateClinic(
    @Param('id') id: string,
    @Body() body: UpdateClinicRequestDto,
  ) {
    return await this.vaccineService.update(parseInt(id), body);
  }
}
