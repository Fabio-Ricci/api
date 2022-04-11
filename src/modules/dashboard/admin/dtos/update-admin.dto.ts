import { IsEmail, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Permission } from 'src/modules/admin/permission.enum';

export class UpdateAdminRequestDto {
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
