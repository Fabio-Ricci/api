import { Expose } from 'class-transformer';

export class ClinicDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
