import { Proposal } from '../entities/proposal.entity';

export abstract class ProposalRepositoryInterface {
  abstract findById(id: number): Promise<Proposal | null>;
  abstract findByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<{ items: Proposal[]; total: number }>;
  abstract findPendingByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<{ items: Proposal[]; total: number }>;
  abstract findRefusedByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<{ items: Proposal[]; total: number }>;
  abstract save(proposal: Proposal): Promise<Proposal>;
  abstract getProfitByStatusGroupedByUser(userId: number): Promise<any>;
  abstract getBestUsersByProfit(startDate: Date, endDate: Date): Promise<any>;
}
