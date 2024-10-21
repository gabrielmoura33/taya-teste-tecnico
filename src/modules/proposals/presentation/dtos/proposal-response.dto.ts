import { ApiProperty } from '@nestjs/swagger';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';
import { Proposal } from '../../domain/entities/proposal.entity';

export class ProposalResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  profit: number;

  @ApiProperty({ enum: ProposalStatus })
  status: ProposalStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userCreatorId: number;

  @ApiProperty()
  customerId: number;

  constructor(proposal: Proposal) {
    this.id = proposal.id;
    this.profit = proposal.profit;
    this.status = proposal.status;
    this.createdAt = proposal.createdAt;
    this.updatedAt = proposal.updatedAt;
    this.userCreatorId = proposal.userCreatorId;
    this.customerId = proposal.customerId;
  }
}
