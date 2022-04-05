import { Expose, Transform } from 'class-transformer';

import { Admin } from '../../../admin/admin.entity';

export class AdminDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  email: string;

  @Transform(({ obj }: { obj: Admin }) => (obj.clinic ? obj.clinic.id : null))
  @Expose()
  clinicId: number | null;
}
