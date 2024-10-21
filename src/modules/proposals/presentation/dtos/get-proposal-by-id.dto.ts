import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class GetProposalByIdDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ description: 'ID of the proposal', example: 1 })
  id: number;
}
