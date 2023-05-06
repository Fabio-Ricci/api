import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Permission } from 'src/modules/user/permission.enum';

export class CreateUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Permission, { each: true })
  @IsOptional()
  permissions: Permission[];
}
