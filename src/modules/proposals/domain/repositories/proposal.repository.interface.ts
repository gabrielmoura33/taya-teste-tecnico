import { Proposal } from '../entities/proposal.entity';

export abstract class ProposalRepositoryInterface {
  abstract findById(id: number): Promise<Proposal | null>;
  abstract findByUserId(userId: number): Promise<Proposal[]>;
  abstract findPendingByUserId(userId: number): Promise<Proposal[]>;
  abstract findRefusedByUserId(userId: number): Promise<Proposal[]>;
  abstract save(proposal: Proposal): Promise<Proposal>;
  abstract getProfitByStatusGroupedByUser(): Promise<any>;
  abstract getBestUsersByProfit(startDate: Date, endDate: Date): Promise<any>;
}
