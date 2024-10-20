import { Injectable, Inject } from '@nestjs/common';
import { Proposal } from '../../domain/entities/proposal.entity';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';

@Injectable()
export class GetRefusedProposalsForUserUseCase {
  constructor(
    @Inject('ProposalRepositoryInterface')
    private readonly proposalRepository: ProposalRepositoryInterface,
  ) {}

  async execute(userId: number): Promise<Proposal[]> {
    return this.proposalRepository.findRefusedByUserId(userId);
  }
}
