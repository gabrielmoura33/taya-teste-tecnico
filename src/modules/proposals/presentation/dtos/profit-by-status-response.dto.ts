import { ApiProperty } from '@nestjs/swagger';

export class ProfitByStatusResponseDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  totalProfit: string;
}
