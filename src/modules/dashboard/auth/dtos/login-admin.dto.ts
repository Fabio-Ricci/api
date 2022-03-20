import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginAdminRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginAdminResponseDto {
  @Expose()
  access_token: string;
}
