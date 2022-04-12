import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateVaccineTypeRequestDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  manufacturer: string;

  @IsString()
  @IsOptional()
  product: string;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  minAgeMonth: number | null;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  maxAgeMonth: number | null;

  @IsNumber()
  @IsOptional()
  sipniId: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  sipniPrevenction: string;
}
