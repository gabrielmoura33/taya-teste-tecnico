import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BestUserResponseDto {
  @ApiProperty()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @Type(() => String)
  fullName: string;

  @ApiProperty()
  @Type(() => String)
  totalProposal: string;
}
