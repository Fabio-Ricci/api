import { Body, Controller, Get, Post } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from 'src/modules/user/user.entity';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginUserRequestDto, LoginUserResponseDto } from './dtos/login.dto';
import { UserDto } from '../user/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async loginUser(
    @Body() body: LoginUserRequestDto,
  ): Promise<LoginUserResponseDto> {
    return await this.authService.login(body.email, body.password);
  }

  @Serialize(UserDto)
  @Get('me')
  async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }
}
