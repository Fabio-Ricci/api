import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Permission } from 'src/modules/admin/permission.enum';

export class CreateAdminRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Permission, { each: true })
  @IsOptional()
  permissions: Permission[];
}
