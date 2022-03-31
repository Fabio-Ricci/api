import { IsArray, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Permission } from 'src/modules/admin/permission.enum';

export class UpdateAdminRequestDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  clinicId: number | null;

  @IsArray()
  @IsOptional()
  permissions: Permission[];
}
