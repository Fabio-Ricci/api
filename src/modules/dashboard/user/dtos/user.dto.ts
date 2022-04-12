import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  street: string;

  @Expose()
  number: string;

  @Expose()
  complement: string;

  @Expose()
  district: string;

  @Expose()
  cep: string;

  @Expose()
  confirmed: boolean;
}
