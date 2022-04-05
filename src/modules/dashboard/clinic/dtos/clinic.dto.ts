import { Expose } from 'class-transformer';

export class ClinicDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;
}
