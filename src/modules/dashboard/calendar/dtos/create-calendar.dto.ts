import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CalendarType } from 'src/modules/calendar/calendar-type.enum';

export class CreateCalendarRequestDto {
  @IsString()
  name: string;

  @IsNumber()
  clinicId: number;

  @IsEnum(CalendarType)
  calendarType: CalendarType;
}
