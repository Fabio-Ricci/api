import { IsString } from 'class-validator';

export class CreateVaccineRequestDto {
  @IsString()
  name: string;
}
