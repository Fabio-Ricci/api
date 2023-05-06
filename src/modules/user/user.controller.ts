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

import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { CreateUserRequestDto } from './dtos/create-user.dto';
import { UpdateUserRequestDto } from './dtos/update-user.dto';
import { Permission } from 'src/modules/user/permission.enum';
import { Permissions } from 'src/decorators/permissions.decorator';

@Serialize(UserDto)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Permissions(Permission.CREATE_USER)
  async createUser(@Body() body: CreateUserRequestDto) {
    return await this.userService.create(body.email, body.password);
  }

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
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('email') email: string,
  ) {
    return await this.userService.getManyAndCount({
      limit: parseInt(limit),
      offset: parseInt(offset),
      email: email,
    });
  }

  @Permissions(Permission.DELETE_USER)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(parseInt(id));
  }

  @Permissions(Permission.UPDATE_USER)
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserRequestDto,
  ) {
    return await this.userService.update(parseInt(id), body);
  }
}
