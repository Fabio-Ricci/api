import { Expose } from 'class-transformer';

export class VaccineDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
