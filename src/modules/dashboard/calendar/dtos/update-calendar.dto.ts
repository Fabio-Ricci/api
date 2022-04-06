import { IsString } from 'class-validator';

export class UpdateCalendarRequestDto {
  @IsString()
  name: string;

  @IsString()
  calendarType: string;
}
