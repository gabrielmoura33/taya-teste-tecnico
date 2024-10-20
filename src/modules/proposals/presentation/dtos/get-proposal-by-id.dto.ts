import { IsInt, IsPositive } from 'class-validator';

export class GetProposalByIdDto {
  @IsInt()
  @IsPositive()
  id: number;
}
