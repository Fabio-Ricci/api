import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from 'src/modules/admin/permission.enum';
import { UserService } from 'src/modules/user/user.service';

@Serialize(UserDto)
@Controller('dashboard/user')
export class DashboardUserController {
  constructor(private userService: UserService) {}

  @Permissions(Permission.GET_USER)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Permissions(Permission.GET_USERS)
  @Get()
  async findUsers(
    @Query('name') name?: string,
    @Query('email') email?: string,
  ) {
    return await this.userService.find(name, email);
  }
}
