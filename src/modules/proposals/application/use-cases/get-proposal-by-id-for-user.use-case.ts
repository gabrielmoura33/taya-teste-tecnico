import { Injectable } from '@nestjs/common';
import { Proposal } from '../../domain/entities/proposal.entity';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';
import {
  ProposalNotFoundException,
  ProposalAccessDeniedException,
} from '../../domain/errors/proposal.exceptions';

@Injectable()
export class GetProposalByIdForUserUseCase {
  constructor(
    private readonly proposalRepository: ProposalRepositoryInterface,
  ) {}

  async execute(proposalId: number, userId: number): Promise<Proposal> {
    const proposal = await this.proposalRepository.findById(proposalId);
    if (!proposal) {
      throw new ProposalNotFoundException();
    }
    if (proposal.userCreatorId !== userId) {
      throw new ProposalAccessDeniedException('Proposal not found');
    }
    return proposal;
  }
}
