import { AdminController } from './admin.controller';
import { GetProfitByStatusGroupedByUserUseCase } from '../../application/use-cases/get-profit-by-status-grouped-by-user.use-case';
import { GetBestUsersUseCase } from '../../application/use-cases/get-best-users.use-case';
import { GetBestUsersDto } from '../dtos/get-best-users.dto';

describe('AdminController', () => {
  let controller: AdminController;
  let getProfitByStatusGroupedByUserUseCase: jest.Mocked<GetProfitByStatusGroupedByUserUseCase>;
  let getBestUsersUseCase: jest.Mocked<GetBestUsersUseCase>;

  beforeEach(() => {
    getProfitByStatusGroupedByUserUseCase = {
      execute: jest.fn(),
    } as any;
    getBestUsersUseCase = {
      execute: jest.fn(),
    } as any;

    controller = new AdminController(
      getProfitByStatusGroupedByUserUseCase,
      getBestUsersUseCase,
    );
  });

  it('should get profit by status grouped by user', async () => {
    const data = [
      { userId: 1, status: 'SUCCESSFUL', totalProfit: '5000' },
      { userId: 2, status: 'PENDING', totalProfit: '3000' },
    ];
    getProfitByStatusGroupedByUserUseCase.execute.mockResolvedValue(data);

    const result = await controller.getProfitByStatus();

    expect(result).toBe(data);
    expect(getProfitByStatusGroupedByUserUseCase.execute).toHaveBeenCalled();
  });

  it('should get best users with pagination', async () => {
    const data = [
      { id: 1, fullName: 'User One', totalProposal: '10000' },
      { id: 2, fullName: 'User Two', totalProposal: '8000' },
    ];
    getBestUsersUseCase.execute.mockResolvedValue(data);

    const query = new GetBestUsersDto();
    query.start = new Date('2022-01-01');
    query.end = new Date('2022-12-31');
    query.skip = 0;
    query.take = 10;

    const result = await controller.getBestUsers(query);

    expect(result).toBe(data);
    expect(getBestUsersUseCase.execute).toHaveBeenCalledWith(
      query.start,
      query.end,
    );
  });
});
