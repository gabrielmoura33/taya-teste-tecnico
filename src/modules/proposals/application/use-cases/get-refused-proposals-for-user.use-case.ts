import { Injectable } from '@nestjs/common';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';

@Injectable()
export class GetRefusedProposalsForUserUseCase {
  constructor(
    private readonly proposalRepository: ProposalRepositoryInterface,
  ) {}

  async execute(
    userId: number,
    skip: number,
    take: number,
  ): Promise<{ items: any[]; total: number }> {
    return this.proposalRepository.findRefusedByUserId(userId, skip, take);
  }
}
