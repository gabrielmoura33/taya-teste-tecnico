import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class GetProposalByIdDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({ description: 'ID of the proposal', example: 1 })
  id: number;
}
