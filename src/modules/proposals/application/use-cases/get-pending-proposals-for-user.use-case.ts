import { Injectable } from '@nestjs/common';
import { Proposal } from '../../domain/entities/proposal.entity';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';

@Injectable()
export class GetPendingProposalsForUserUseCase {
  constructor(
    private readonly proposalRepository: ProposalRepositoryInterface,
  ) {}

  async execute(userId: number): Promise<Proposal[]> {
    return this.proposalRepository.findPendingByUserId(userId);
  }
}
