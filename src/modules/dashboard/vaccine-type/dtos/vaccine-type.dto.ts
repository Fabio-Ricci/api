import { Expose } from 'class-transformer';

export class VaccineTypeDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;
}
