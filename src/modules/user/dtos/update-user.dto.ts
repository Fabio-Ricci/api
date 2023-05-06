import { IsEmail, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Permission } from 'src/modules/user/permission.enum';

export class UpdateUserRequestDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  clinicId: number | null;

  @IsEnum(Permission, { each: true })
  @IsOptional()
  permissions: Permission[];
}
