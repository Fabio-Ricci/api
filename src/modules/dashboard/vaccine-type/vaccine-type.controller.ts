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
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from 'src/modules/admin/permission.enum';
import { VaccineTypeDto } from './dtos/vaccine-type.dto';
import { CreateVaccineTypeRequestDto } from './dtos/create-vaccine-type.dto';
import { VaccineTypeService } from 'src/modules/vaccine-type/vaccine-type.service';
import { UpdateVaccineTypeRequestDto } from './dtos/update-vaccine-type.dto';

@Serialize(VaccineTypeDto)
@Controller('dashboard/vaccine-type')
export class DashboardVaccineTypeController {
  constructor(private vaccineTypeService: VaccineTypeService) {}

  @Permissions(Permission.CREATE_VACCINE_TYPE)
  @Post()
  async createVaccineType(@Body() body: CreateVaccineTypeRequestDto) {
    return await this.vaccineTypeService.create(body.name);
  }

  @Permissions(Permission.GET_VACCINE_TYPE)
  @Get('/:id')
  async findVaccineType(@Param('id') id: string) {
    const vaccineType = await this.vaccineTypeService.findOne(parseInt(id));
    if (!vaccineType) {
      throw new NotFoundException();
    }
    return vaccineType;
  }

  @Permissions(Permission.GET_VACCINE_TYPES)
  @Get()
  async findVaccineTypes(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('name') name: string,
  ) {
    return await this.vaccineTypeService.getManyAndCount({
      limit: parseInt(limit),
      offset: parseInt(offset),
      name: name,
    });
  }

  @Permissions(Permission.DELETE_VACCINE_TYPE)
  @Delete('/:id')
  async deleteVaccineType(@Param('id') id: string) {
    return await this.vaccineTypeService.delete(parseInt(id));
  }

  @Permissions(Permission.UPDATE_VACCINE_TYPE)
  @Patch('/:id')
  async updateVaccineType(
    @Param('id') id: string,
    @Body() body: UpdateVaccineTypeRequestDto,
  ) {
    return await this.vaccineTypeService.update(parseInt(id), body);
  }
}
