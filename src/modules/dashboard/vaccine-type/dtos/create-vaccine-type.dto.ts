import { IsString } from 'class-validator';

export class CreateVaccineTypeRequestDto {
  @IsString()
  name: string;
}
