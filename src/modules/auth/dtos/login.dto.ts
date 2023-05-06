import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginUserResponseDto {
  @Expose()
  access_token: string;
}
