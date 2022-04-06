import { IsNumber, IsString } from 'class-validator';

export class CreateCalendarRequestDto {
  @IsString()
  name: string;

  @IsNumber()
  clinicId: number;

  @IsString()
  calendarType: string;
}
