import { Expose } from 'class-transformer';

export class VaccineTypeDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  manufacturer: string;

  @Expose()
  product: string;

  @Expose()
  minAgeMonth: number | null;

  @Expose()
  maxAgeMonth: number | null;

  @Expose()
  sipniId: number;

  @Expose()
  description: string;

  @Expose()
  sipniPrevenction: string;
}
