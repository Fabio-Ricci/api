import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClinicRequestDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  cnpj: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsString()
  @IsOptional()
  cep: string;

  @IsString()
  @IsOptional()
  street: string;

  @IsString()
  @IsOptional()
  district: string;

  @IsString()
  @IsOptional()
  complement: string;

  @IsString()
  @IsOptional()
  number: string;

  @IsNumber()
  @IsOptional()
  shipping: number;
}
