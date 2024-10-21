import { ProposalController } from './proposal.controller';
import { GetProposalByIdForUserUseCase } from '../../application/use-cases/get-proposal-by-id-for-user.use-case';
import { GetPendingProposalsForUserUseCase } from '../../application/use-cases/get-pending-proposals-for-user.use-case';
import { GetRefusedProposalsForUserUseCase } from '../../application/use-cases/get-refused-proposals-for-user.use-case';
import { ApproveProposalUseCase } from '../../application/use-cases/approve-proposal.use-case';
import { Proposal } from '../../domain/entities/proposal.entity';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';
import { ProposalResponseDto } from '../dtos/proposal-response.dto';
import { PaginationDto } from '../dtos/pagination.dto';

describe('ProposalController', () => {
  let controller: ProposalController;
  let getProposalByIdForUserUseCase: jest.Mocked<GetProposalByIdForUserUseCase>;
  let getPendingProposalsForUserUseCase: jest.Mocked<GetPendingProposalsForUserUseCase>;
  let getRefusedProposalsForUserUseCase: jest.Mocked<GetRefusedProposalsForUserUseCase>;
  let approveProposalUseCase: jest.Mocked<ApproveProposalUseCase>;

  beforeEach(() => {
    getProposalByIdForUserUseCase = {
      execute: jest.fn(),
    } as any;
    getPendingProposalsForUserUseCase = {
      execute: jest.fn(),
    } as any;
    getRefusedProposalsForUserUseCase = {
      execute: jest.fn(),
    } as any;
    approveProposalUseCase = {
      execute: jest.fn(),
    } as any;

    controller = new ProposalController(
      getProposalByIdForUserUseCase,
      getPendingProposalsForUserUseCase,
      getRefusedProposalsForUserUseCase,
      approveProposalUseCase,
    );
  });

  it('should get proposal by id', async () => {
    const proposal = new Proposal(
      1,
      1000,
      ProposalStatus.PENDING,
      1,
      1,
      new Date(),
      new Date(),
    );
    getProposalByIdForUserUseCase.execute.mockResolvedValue(proposal);

    const req = { user: { id: 1 } };
    const result = await controller.getProposalById({ id: 1 }, req as any);

    expect(result).toEqual(new ProposalResponseDto(proposal));
    expect(getProposalByIdForUserUseCase.execute).toHaveBeenCalledWith(1, 1);
  });

  it('should get pending proposals with pagination', async () => {
    const proposals = [
      new Proposal(
        1,
        1000,
        ProposalStatus.PENDING,
        1,
        1,
        new Date(),
        new Date(),
      ),
    ];
    getPendingProposalsForUserUseCase.execute.mockResolvedValue({
      items: proposals,
      total: 1,
    });

    const req = { user: { id: 1 } };
    const pagination = new PaginationDto();
    pagination.skip = 0;
    pagination.take = 10;

    const result = await controller.getPendingProposals(req as any, pagination);

    expect(result.items).toEqual(
      proposals.map((p) => new ProposalResponseDto(p)),
    );
    expect(result.total).toBe(1);
    expect(getPendingProposalsForUserUseCase.execute).toHaveBeenCalledWith(
      1,
      0,
      10,
    );
  });

  it('should approve proposal', async () => {
    const proposal = new Proposal(
      1,
      1000,
      ProposalStatus.SUCCESSFUL,
      1,
      1,
      new Date(),
      new Date(),
    );
    approveProposalUseCase.execute.mockResolvedValue(proposal);

    const req = { user: { id: 1 } };
    const result = await controller.approveProposal(
      { proposal_id: 1 },
      req as any,
    );

    expect(result).toEqual(new ProposalResponseDto(proposal));
    expect(approveProposalUseCase.execute).toHaveBeenCalledWith(1, 1);
  });
});
