import { Injectable } from '@nestjs/common';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';

@Injectable()
export class GetBestUsersUseCase {
  constructor(
    private readonly proposalRepository: ProposalRepositoryInterface,
  ) {}

  async execute(startDate: Date, endDate: Date): Promise<any> {
    return this.proposalRepository.getBestUsersByProfit(startDate, endDate);
  }
}
