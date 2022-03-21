import { IsString } from 'class-validator';

export class CreateClinicRequestDto {
  @IsString()
  name: string;
}
