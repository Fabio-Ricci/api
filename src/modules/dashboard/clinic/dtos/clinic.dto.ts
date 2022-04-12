import { Expose } from 'class-transformer';

export class ClinicDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  cnpj: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  imageUrl: string;

  @Expose()
  cep: string;

  @Expose()
  street: string;

  @Expose()
  district: string;

  @Expose()
  complement: string;

  @Expose()
  number: string;

  @Expose()
  shipping: number;
}
