import { GetPendingProposalsForUserUseCase } from './get-pending-proposals-for-user.use-case';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';
import { Proposal } from '../../domain/entities/proposal.entity';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';

describe('GetPendingProposalsForUserUseCase', () => {
  let useCase: GetPendingProposalsForUserUseCase;
  let proposalRepository: jest.Mocked<ProposalRepositoryInterface>;

  beforeEach(() => {
    proposalRepository = {
      findById: jest.fn(),
      findByUserId: jest.fn(),
      findPendingByUserId: jest.fn(),
      findRefusedByUserId: jest.fn(),
      save: jest.fn(),
      getProfitByStatusGroupedByUser: jest.fn(),
      getBestUsersByProfit: jest.fn(),
    };
    useCase = new GetPendingProposalsForUserUseCase(proposalRepository);
  });

  it('should return list of pending proposals with pagination', async () => {
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
      new Proposal(
        2,
        2000,
        ProposalStatus.PENDING,
        1,
        2,
        new Date(),
        new Date(),
      ),
    ];
    proposalRepository.findPendingByUserId.mockResolvedValue({
      items: proposals,
      total: 2,
    });

    const result = await useCase.execute(1, 0, 10);

    expect(result).toEqual({ items: proposals, total: 2 });
    expect(proposalRepository.findPendingByUserId).toHaveBeenCalledWith(
      1,
      0,
      10,
    );
  });
});
