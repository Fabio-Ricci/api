import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateVaccineTypeRequestDto {
  @IsString()
  name: string;

  @IsString()
  manufacturer: string;

  @IsString()
  product: string;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  minAgeMonth: number | null;

  @IsNumber()
  @ValidateIf((_, value) => value !== null)
  maxAgeMonth: number | null;

  @IsNumber()
  sipniId: number;

  @IsString()
  description: string;

  @IsString()
  sipniPrevenction: string;
}
