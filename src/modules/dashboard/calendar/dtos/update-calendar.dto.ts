import { IsEnum, IsString } from 'class-validator';
import { CalendarType } from 'src/modules/calendar/calendar-type.enum';

export class UpdateCalendarRequestDto {
  @IsString()
  name: string;

  @IsEnum(CalendarType)
  calendarType: CalendarType;
}
