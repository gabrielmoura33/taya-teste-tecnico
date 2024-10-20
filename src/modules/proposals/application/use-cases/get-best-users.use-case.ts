import { Injectable, Inject } from '@nestjs/common';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';

@Injectable()
export class GetBestUsersUseCase {
  constructor(
    @Inject('ProposalRepositoryInterface')
    private readonly proposalRepository: ProposalRepositoryInterface,
  ) {}

  async execute(startDate: Date, endDate: Date): Promise<any> {
    return this.proposalRepository.getBestUsersByProfit(startDate, endDate);
  }
}
