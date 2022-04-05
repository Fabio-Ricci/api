import { IsNumber, IsString } from 'class-validator';

export class CreateVaccineRequestDto {
  @IsString()
  name: string;

  @IsNumber()
  clinicId: number;

  @IsNumber()
  vaccineTypeId: number;
}
