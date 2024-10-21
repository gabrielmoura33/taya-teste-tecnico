import { ApproveProposalUseCase } from './approve-proposal.use-case';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository.interface';
import { Proposal } from '../../domain/entities/proposal.entity';
import { User } from '../../../users/domain/entities/user.entity';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';
import {
  ProposalNotFoundException,
  ProposalNotPendingException,
} from '../../domain/errors/proposal.exceptions';
import { UserNotFoundException } from '../../../users/domain/errors/user.exceptions';

describe('ApproveProposalUseCase', () => {
  let useCase: ApproveProposalUseCase;
  let proposalRepository: jest.Mocked<ProposalRepositoryInterface>;
  let userRepository: jest.Mocked<UserRepositoryInterface>;

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
    userRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    };
    useCase = new ApproveProposalUseCase(proposalRepository, userRepository);
  });

  it('should approve proposal and update user balance', async () => {
    const proposal = new Proposal(
      1,
      1000,
      ProposalStatus.PENDING,
      1,
      1,
      new Date(),
      new Date(),
    );
    const user = new User(1, 'User', 5000, new Date(), new Date());
    proposalRepository.findById.mockResolvedValue(proposal);
    proposalRepository.save.mockResolvedValue({
      ...proposal,
      status: ProposalStatus.SUCCESSFUL,
    });
    userRepository.findById.mockResolvedValue(user);
    userRepository.save.mockResolvedValue({
      ...user,
      balance: user.balance + proposal.profit,
    });

    const result = await useCase.execute(1, 1);

    expect(result.status).toBe(ProposalStatus.SUCCESSFUL);
    expect(proposalRepository.findById).toHaveBeenCalledWith(1);
    expect(proposalRepository.save).toHaveBeenCalled();
    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(userRepository.save).toHaveBeenCalled();
  });

  it('should throw ProposalNotFoundException when proposal not found', async () => {
    proposalRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(1, 1)).rejects.toThrow(
      ProposalNotFoundException,
    );
    expect(proposalRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should throw ProposalNotPendingException when proposal is not pending', async () => {
    const proposal = new Proposal(
      1,
      1000,
      ProposalStatus.SUCCESSFUL,
      1,
      1,
      new Date(),
      new Date(),
    );
    proposalRepository.findById.mockResolvedValue(proposal);

    await expect(useCase.execute(1, 1)).rejects.toThrow(
      ProposalNotPendingException,
    );
    expect(proposalRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should throw UserNotFoundException when user not found', async () => {
    const proposal = new Proposal(
      1,
      1000,
      ProposalStatus.PENDING,
      1,
      1,
      new Date(),
      new Date(),
    );
    proposalRepository.findById.mockResolvedValue(proposal);
    userRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(1, 1)).rejects.toThrow(UserNotFoundException);
    expect(userRepository.findById).toHaveBeenCalledWith(1);
  });
});
