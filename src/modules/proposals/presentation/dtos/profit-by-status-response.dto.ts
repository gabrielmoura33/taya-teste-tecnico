import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProfitByStatusResponseDto {
  @ApiProperty()
  @Type(() => Number)
  userId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  totalProfit: string;
}
