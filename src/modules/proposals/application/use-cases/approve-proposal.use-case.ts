import { Injectable, Inject } from '@nestjs/common';
import { Proposal } from '../../domain/entities/proposal.entity';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository.interface';
import {
  ProposalNotFoundException,
  ProposalNotPendingException,
} from '../../domain/errors/proposal.exceptions';
import { UserNotFoundException } from '../../../users/domain/errors/user.exceptions';

@Injectable()
export class ApproveProposalUseCase {
  constructor(
    @Inject('ProposalRepositoryInterface')
    private readonly proposalRepository: ProposalRepositoryInterface,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(proposalId: number, executorUserId: number): Promise<Proposal> {
    const proposal = await this.proposalRepository.findById(proposalId);
    if (!proposal) {
      throw new ProposalNotFoundException();
    }
    if (proposal.status !== ProposalStatus.PENDING) {
      throw new ProposalNotPendingException();
    }
    proposal.status = ProposalStatus.SUCCESSFUL;
    await this.proposalRepository.save(proposal);

    const user = await this.userRepository.findById(executorUserId);
    if (!user) {
      throw new UserNotFoundException();
    }
    user.balance += proposal.profit;
    await this.userRepository.save(user);

    return proposal;
  }
}
