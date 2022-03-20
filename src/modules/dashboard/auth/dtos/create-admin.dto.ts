import { IsEmail, IsString } from 'class-validator';

export class CreateAdminRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
