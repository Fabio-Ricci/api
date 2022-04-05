import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVaccineRequestDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  vaccineTypeId: number;
}
