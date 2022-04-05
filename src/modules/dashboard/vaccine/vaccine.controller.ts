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
import { DashboardVaccineGuard } from './guards/dashboard-vaccine.guard';
import { CreateVaccineRequestDto } from './dtos/create-vaccine.dto';
import { UpdateVaccineRequestDto } from './dtos/update-vaccine.dto';

@Serialize(VaccineDto)
@Controller('dashboard/vaccine')
export class DashboardVaccineController {
  constructor(private vaccineService: VaccineService) {}

  @Permissions(Permission.CREATE_VACCINE)
  @Post()
  async createVaccine(@Body() body: CreateVaccineRequestDto) {
    return await this.vaccineService.create(body);
  }

  @UseGuards(DashboardVaccineGuard)
  @Permissions(Permission.GET_VACCINE)
  @Get('/:id')
  async findVaccine(@Param('id') id: string) {
    const vaccine = await this.vaccineService.findOne(parseInt(id));
    if (!vaccine) {
      throw new NotFoundException();
    }
    return vaccine;
  }

  @Permissions(Permission.GET_VACCINES)
  @Get()
  async findVaccines(
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
  async deleteVaccine(@Param('id') id: string) {
    return await this.vaccineService.delete(parseInt(id));
  }

  @UseGuards(DashboardVaccineGuard)
  @Permissions(Permission.UPDATE_VACCINE)
  @Patch('/:id')
  async updateVaccine(
    @Param('id') id: string,
    @Body() body: UpdateVaccineRequestDto,
  ) {
    return await this.vaccineService.update(parseInt(id), body);
  }
}
