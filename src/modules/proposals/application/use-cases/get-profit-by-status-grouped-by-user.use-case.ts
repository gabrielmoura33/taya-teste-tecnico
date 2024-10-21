import { Injectable } from '@nestjs/common';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';

@Injectable()
export class GetProfitByStatusGroupedByUserUseCase {
  constructor(
    private readonly proposalRepository: ProposalRepositoryInterface,
  ) {}

  async execute(userId: number): Promise<any> {
    return this.proposalRepository.getProfitByStatusGroupedByUser(userId);
  }
}
