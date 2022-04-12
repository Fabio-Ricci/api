import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVaccineRequestDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  vaccineTypeId: number;
}
