import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { GetProposalByIdForUserUseCase } from '../../application/use-cases/get-proposal-by-id-for-user.use-case';
import { GetPendingProposalsForUserUseCase } from '../../application/use-cases/get-pending-proposals-for-user.use-case';
import { GetRefusedProposalsForUserUseCase } from '../../application/use-cases/get-refused-proposals-for-user.use-case';
import { ApproveProposalUseCase } from '../../application/use-cases/approve-proposal.use-case';
import { GetProposalByIdDto } from '../dtos/get-proposal-by-id.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { ProposalResponseDto } from '../dtos/proposal-response.dto';
import { Documentation } from '../../../../common/decorators/documentation.decorator';
import {
  ProposalNotFoundResponse,
  ProposalNotPendingResponse,
} from '../../domain/errors/proposal.exceptions';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalController {
  constructor(
    private readonly getProposalByIdForUserUseCase: GetProposalByIdForUserUseCase,
    private readonly getPendingProposalsForUserUseCase: GetPendingProposalsForUserUseCase,
    private readonly getRefusedProposalsForUserUseCase: GetRefusedProposalsForUserUseCase,
    private readonly approveProposalUseCase: ApproveProposalUseCase,
  ) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Documentation({
    title: 'Get Proposal By ID',
    description: 'Retrieve a proposal by its ID for the authenticated user.',
    responses: [
      {
        status: 200,
        description: 'Proposal retrieved successfully',
        type: ProposalResponseDto,
      },
    ],
    errors: [
      {
        status: 404,
        description: 'Proposal not found or access denied',
        type: ProposalNotFoundResponse,
      },
    ],
  })
  async getProposalById(
    @Param() params: GetProposalByIdDto,
    @Req() req: Request,
  ): Promise<ProposalResponseDto> {
    const userId = (req as any).user.id;
    const proposal = await this.getProposalByIdForUserUseCase.execute(
      params.id,
      userId,
    );
    return new ProposalResponseDto(proposal);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Documentation({
    title: 'Get Pending Proposals',
    description: 'Retrieve pending proposals for the authenticated user.',
    responses: [
      {
        status: 200,
        description: 'List of pending proposals',
        type: [ProposalResponseDto],
      },
    ],
  })
  async getPendingProposals(
    @Req() req: Request,
    @Query() pagination: PaginationDto,
  ): Promise<{ items: ProposalResponseDto[]; total: number }> {
    const userId = (req as any).user.id;
    const result = await this.getPendingProposalsForUserUseCase.execute(
      userId,
      pagination.skip,
      pagination.take,
    );
    const items = result.items.map(
      (proposal) => new ProposalResponseDto(proposal),
    );
    return { items, total: result.total };
  }

  @Get('refused')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Documentation({
    title: 'Get Refused Proposals',
    description: 'Retrieve refused proposals for the authenticated user.',
    responses: [
      {
        status: 200,
        description: 'List of refused proposals',
        type: [ProposalResponseDto],
      },
    ],
  })
  async getRefusedProposals(
    @Req() req: Request,
    @Query() pagination: PaginationDto,
  ): Promise<{ items: ProposalResponseDto[]; total: number }> {
    const userId = (req as any).user.id;
    const result = await this.getRefusedProposalsForUserUseCase.execute(
      userId,
      pagination.skip,
      pagination.take,
    );
    const items = result.items.map(
      (proposal) => new ProposalResponseDto(proposal),
    );
    return { items, total: result.total };
  }

  @Post(':proposal_id/approve')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Documentation({
    title: 'Approve Proposal',
    description: 'Approve a pending proposal.',
    responses: [
      {
        status: 200,
        description: 'Proposal approved successfully',
        type: ProposalResponseDto,
      },
    ],
    errors: [
      {
        status: 404,
        description: 'Proposal not found',
        type: ProposalNotFoundResponse,
      },
      {
        status: 400,
        description: 'Proposal is not pending',
        type: ProposalNotPendingResponse,
      },
    ],
  })
  async approveProposal(
    @Param() params: GetProposalByIdDto,
    @Req() req: Request,
  ): Promise<ProposalResponseDto> {
    const executorUserId = (req as any).user.id;
    const proposal = await this.approveProposalUseCase.execute(
      params.id,
      executorUserId,
    );
    return new ProposalResponseDto(proposal);
  }
}
