import { IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetBestUsersDto {
  @IsDateString()
  @Type(() => Date)
  start: Date;

  @IsDateString()
  @Type(() => Date)
  end: Date;
}
