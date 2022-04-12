import { IsNumber, IsString } from 'class-validator';

export class CreateVaccineRequestDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  description: string;

  @IsNumber()
  clinicId: number;

  @IsNumber()
  vaccineTypeId: number;
}
