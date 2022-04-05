import { Expose, Transform, Type } from 'class-transformer';

import { Vaccine } from 'src/modules/vaccine/vaccine.entity';
import { VaccineTypeDto } from '../../vaccine-type/dtos/vaccine-type.dto';

export class VaccineDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }: { obj: Vaccine }) => obj.clinic.id)
  clinicId: number;

  @Expose()
  @Type(() => VaccineTypeDto)
  vaccineType: VaccineTypeDto;
}
