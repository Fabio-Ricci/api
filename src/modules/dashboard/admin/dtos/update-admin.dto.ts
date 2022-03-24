import { IsEmail, IsOptional } from 'class-validator';

export class UpdateAdminRequestDto {
  @IsEmail()
  @IsOptional()
  email: string;
}
