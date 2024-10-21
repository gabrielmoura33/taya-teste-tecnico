import { UserRepository } from './user.repository';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { User } from '../../domain/entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserRepository', () => {
  let repository: UserRepository;
  let ormRepository: jest.Mocked<Repository<UserOrmEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserOrmEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    ormRepository = module.get(getRepositoryToken(UserOrmEntity));
  });

  it('should find user by id', async () => {
    const entity = new UserOrmEntity();
    entity.id = 1;
    ormRepository.findOne.mockResolvedValue(entity);

    const result = await repository.findById(1);

    expect(result).toBeInstanceOf(User);
    expect(ormRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should save a user', async () => {
    const user = new User(1, 'User', 5000, new Date(), new Date());
    const entity = new UserOrmEntity();
    ormRepository.save.mockResolvedValue(entity);

    const result = await repository.save(user);

    expect(result).toBeInstanceOf(User);
    expect(ormRepository.save).toHaveBeenCalled();
  });
});
