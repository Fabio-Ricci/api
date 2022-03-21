import { IsOptional, IsString } from 'class-validator';

export class UpdateClinicRequestDto {
  @IsString()
  @IsOptional()
  name: string;
}
