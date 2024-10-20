import { Proposal } from '../entities/proposal.entity';

export interface ProposalRepositoryInterface {
  findById(id: number): Promise<Proposal | null>;
  findByUserId(userId: number): Promise<Proposal[]>;
  findPendingByUserId(userId: number): Promise<Proposal[]>;
  findRefusedByUserId(userId: number): Promise<Proposal[]>;
  save(proposal: Proposal): Promise<Proposal>;
  getProfitByStatusGroupedByUser(): Promise<any>;
  getBestUsersByProfit(startDate: Date, endDate: Date): Promise<any>;
}
