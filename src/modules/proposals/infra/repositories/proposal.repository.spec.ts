import { ProposalRepository } from './proposal.repository';
import { Repository } from 'typeorm';
import { ProposalOrmEntity } from '../entities/proposal.orm-entity';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';
import { Proposal } from '../../domain/entities/proposal.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProposalRepository', () => {
  let repository: ProposalRepository;
  let ormRepository: jest.Mocked<Repository<ProposalOrmEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProposalRepository,
        {
          provide: getRepositoryToken(ProposalOrmEntity),
          useValue: {
            findOne: jest.fn(),
            findAndCount: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ProposalRepository>(ProposalRepository);
    ormRepository = module.get(getRepositoryToken(ProposalOrmEntity));
  });

  it('should find proposal by id', async () => {
    const entity = new ProposalOrmEntity();
    entity.id = 1;
    entity.userCreatorId = 1;
    ormRepository.findOne.mockResolvedValue(entity);

    const result = await repository.findById(1);

    expect(result).toBeInstanceOf(Proposal);
    expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should find pending proposals by user id with pagination', async () => {
    const entity = new ProposalOrmEntity();
    entity.id = 1;
    entity.status = ProposalStatus.PENDING;
    entity.userCreatorId = 1;
    ormRepository.findAndCount.mockResolvedValue([[entity], 1]);

    const result = await repository.findPendingByUserId(1, 0, 10);

    expect(result.items.length).toBe(1);
    expect(result.total).toBe(1);
    expect(ormRepository.findAndCount).toHaveBeenCalledWith({
      where: { userCreatorId: 1, status: ProposalStatus.PENDING },
      skip: 0,
      take: 10,
    });
  });

  it('should save a proposal', async () => {
    const proposal = new Proposal(
      1,
      1000,
      ProposalStatus.PENDING,
      1,
      1,
      new Date(),
      new Date(),
    );
    const entity = new ProposalOrmEntity();
    ormRepository.save.mockResolvedValue(entity);

    const result = await repository.save(proposal);

    expect(result).toBeInstanceOf(Proposal);
    expect(ormRepository.save).toHaveBeenCalled();
  });
});
