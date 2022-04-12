import { IsNumber, IsString } from 'class-validator';

export class CreateClinicRequestDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  cnpj: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  imageUrl: string;

  @IsString()
  cep: string;

  @IsString()
  street: string;

  @IsString()
  district: string;

  @IsString()
  complement: string;

  @IsString()
  number: string;

  @IsNumber()
  shipping: number;
}
