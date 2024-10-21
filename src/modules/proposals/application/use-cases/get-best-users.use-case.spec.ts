import { GetBestUsersUseCase } from './get-best-users.use-case';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';

describe('GetBestUsersUseCase', () => {
  let useCase: GetBestUsersUseCase;
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
    useCase = new GetBestUsersUseCase(proposalRepository);
  });

  it('should return best users by profit within date range', async () => {
    const data = [
      { id: 1, fullName: 'User One', totalProposal: '10000' },
      { id: 2, fullName: 'User Two', totalProposal: '8000' },
    ];
    proposalRepository.getBestUsersByProfit.mockResolvedValue(data);

    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-12-31');

    const result = await useCase.execute(startDate, endDate);

    expect(result).toBe(data);
    expect(proposalRepository.getBestUsersByProfit).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });
});
