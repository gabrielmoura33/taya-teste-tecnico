import { GetProposalByIdForUserUseCase } from './get-proposal-by-id-for-user.use-case';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';
import { Proposal } from '../../domain/entities/proposal.entity';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';
import {
  ProposalNotFoundException,
  ProposalAccessDeniedException,
} from '../../domain/errors/proposal.exceptions';

describe('GetProposalByIdForUserUseCase', () => {
  let useCase: GetProposalByIdForUserUseCase;
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
    useCase = new GetProposalByIdForUserUseCase(proposalRepository);
  });

  it('should return proposal when found and user has access', async () => {
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

    const result = await useCase.execute(1, 1);

    expect(result).toBe(proposal);
    expect(proposalRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should throw ProposalNotFoundException when proposal not found', async () => {
    proposalRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute(1, 1)).rejects.toThrow(
      ProposalNotFoundException,
    );
    expect(proposalRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should throw ProposalAccessDeniedException when user does not have access', async () => {
    const proposal = new Proposal(
      1,
      1000,
      ProposalStatus.PENDING,
      2,
      1,
      new Date(),
      new Date(),
    );
    proposalRepository.findById.mockResolvedValue(proposal);

    await expect(useCase.execute(1, 1)).rejects.toThrow(
      ProposalAccessDeniedException,
    );
    expect(proposalRepository.findById).toHaveBeenCalledWith(1);
  });
});
