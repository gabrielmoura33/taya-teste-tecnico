import { Controller, Get, Post, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { Proposal } from '../../domain/entities/proposal.entity';
import { GetProposalByIdForUserUseCase } from '../../application/use-cases/get-proposal-by-id-for-user.use-case';
import { GetPendingProposalsForUserUseCase } from '../../application/use-cases/get-pending-proposals-for-user.use-case';
import { GetRefusedProposalsForUserUseCase } from '../../application/use-cases/get-refused-proposals-for-user.use-case';
import { ApproveProposalUseCase } from '../../application/use-cases/approve-proposal.use-case';

@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly getProposalByIdForUserUseCase: GetProposalByIdForUserUseCase,
    private readonly getPendingProposalsForUserUseCase: GetPendingProposalsForUserUseCase,
    private readonly getRefusedProposalsForUserUseCase: GetRefusedProposalsForUserUseCase,
    private readonly approveProposalUseCase: ApproveProposalUseCase,
  ) {}

  @Get(':id')
  async getProposalById(
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<Proposal> {
    const userId = (req as any).user.id;
    return this.getProposalByIdForUserUseCase.execute(id, userId);
  }

  @Get()
  async getPendingProposals(@Req() req: Request): Promise<Proposal[]> {
    const userId = (req as any).user.id;
    return this.getPendingProposalsForUserUseCase.execute(userId);
  }

  @Get('refused')
  async getRefusedProposals(@Req() req: Request): Promise<Proposal[]> {
    const userId = (req as any).user.id;
    return this.getRefusedProposalsForUserUseCase.execute(userId);
  }

  @Post(':proposal_id/approve')
  async approveProposal(
    @Param('proposal_id') proposalId: number,
    @Req() req: Request,
  ): Promise<Proposal> {
    const executorUserId = (req as any).user.id;
    return this.approveProposalUseCase.execute(proposalId, executorUserId);
  }
}
