import { GetProfitByStatusGroupedByUserUseCase } from './get-profit-by-status-grouped-by-user.use-case';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';

describe('GetProfitByStatusGroupedByUserUseCase', () => {
  let useCase: GetProfitByStatusGroupedByUserUseCase;
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
    useCase = new GetProfitByStatusGroupedByUserUseCase(proposalRepository);
  });

  it('should return profit by status grouped by user', async () => {
    const data = [
      { userId: 1, status: 'SUCCESSFUL', totalProfit: '5000' },
      { userId: 2, status: 'PENDING', totalProfit: '3000' },
    ];
    proposalRepository.getProfitByStatusGroupedByUser.mockResolvedValue(data);

    const result = await useCase.execute(1);

    expect(result).toBe(data);
    expect(
      proposalRepository.getProfitByStatusGroupedByUser,
    ).toHaveBeenCalled();
  });
});
