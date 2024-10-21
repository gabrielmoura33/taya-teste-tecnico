import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class ApproveProposalDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  proposal_id: number;
}
