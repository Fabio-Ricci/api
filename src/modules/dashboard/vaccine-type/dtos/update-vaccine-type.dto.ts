import { IsOptional, IsString } from 'class-validator';

export class UpdateVaccineTypeRequestDto {
  @IsString()
  @IsOptional()
  name: string;
}
