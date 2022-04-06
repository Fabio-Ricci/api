import { Expose, Transform } from 'class-transformer';

import { Calendar } from 'src/modules/calendar/calendar.entity';

export class CalendarDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  calendarType: string;

  @Expose()
  @Transform(({ obj }: { obj: Calendar }) => obj.clinic.id)
  clinicId: number;
}
