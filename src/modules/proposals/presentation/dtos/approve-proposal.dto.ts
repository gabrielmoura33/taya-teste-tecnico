import { IsInt, IsPositive } from 'class-validator';

export class ApproveProposalDto {
  @IsInt()
  @IsPositive()
  proposal_id: number;
}
