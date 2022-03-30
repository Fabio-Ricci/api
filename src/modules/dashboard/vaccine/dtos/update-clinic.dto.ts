import { IsString } from 'class-validator';

export class UpdateVaccineRequestDto {
  @IsString()
  name: string;
}
