import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { ProposalOrmEntity } from '../src/modules/proposals/infra/entities/proposal.orm-entity';
import { UserOrmEntity } from '../src/modules/users/infrastructure/entities/user.orm-entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProposalStatus } from '../src/modules/proposals/domain/entities/proposal-status.enum';

describe('AdminController (e2e)', () => {
  let app: INestApplication;
  let proposalRepository: Repository<ProposalOrmEntity>;
  let userRepository: Repository<UserOrmEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    proposalRepository = moduleFixture.get<Repository<ProposalOrmEntity>>(
      getRepositoryToken(ProposalOrmEntity),
    );
    userRepository = moduleFixture.get<Repository<UserOrmEntity>>(
      getRepositoryToken(UserOrmEntity),
    );

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clear database tables before each test
    await proposalRepository.query('DELETE FROM proposals');
    await userRepository.query('DELETE FROM users');
  });

  it('GET /admin/profit-by-status - success', async () => {
    const user1 = await userRepository.save({ name: 'User 1', balance: 0 });
    const user2 = await userRepository.save({ name: 'User 2', balance: 0 });

    // Create proposals for user1
    await proposalRepository.save([
      {
        profit: 1000,
        status: ProposalStatus.SUCCESSFUL,
        userCreatorId: user1.id,
        customerId: 1,
      },
      {
        profit: 500,
        status: ProposalStatus.PENDING,
        userCreatorId: user1.id,
        customerId: 1,
      },
    ]);

    // Create proposals for user2
    await proposalRepository.save([
      {
        profit: 1500,
        status: ProposalStatus.SUCCESSFUL,
        userCreatorId: user2.id,
        customerId: 1,
      },
    ]);

    const response = await request(app.getHttpServer())
      .get('/admin/profit-by-status')
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          userId: user1.id,
          status: ProposalStatus.SUCCESSFUL,
          totalProfit: '1000.00',
        },
        {
          userId: user1.id,
          status: ProposalStatus.PENDING,
          totalProfit: '500.00',
        },
        {
          userId: user2.id,
          status: ProposalStatus.SUCCESSFUL,
          totalProfit: '1500.00',
        },
      ]),
    );
  });

  it('GET /admin/best-users - success', async () => {
    const user1 = await userRepository.save({ name: 'User 1', balance: 0 });
    const user2 = await userRepository.save({ name: 'User 2', balance: 0 });

    // Create proposals for user1
    await proposalRepository.save([
      {
        profit: 1000,
        status: ProposalStatus.SUCCESSFUL,
        userCreatorId: user1.id,
        customerId: 1,
        createdAt: new Date('2022-01-10'),
      },
      {
        profit: 500,
        status: ProposalStatus.SUCCESSFUL,
        userCreatorId: user1.id,
        customerId: 1,
        createdAt: new Date('2022-01-15'),
      },
    ]);

    // Create proposals for user2
    await proposalRepository.save([
      {
        profit: 2000,
        status: ProposalStatus.SUCCESSFUL,
        userCreatorId: user2.id,
        customerId: 1,
        createdAt: new Date('2022-02-10'),
      },
    ]);

    const response = await request(app.getHttpServer())
      .get('/admin/best-users?start=2022-01-01&end=2022-12-31')
      .expect(200);

    expect(response.body).toEqual([
      {
        id: user2.id,
        fullName: 'User 2',
        totalProposal: '2000.00',
      },
      {
        id: user1.id,
        fullName: 'User 1',
        totalProposal: '1500.00',
      },
    ]);
  });

  it('GET /admin/best-users - validation error', async () => {
    await request(app.getHttpServer())
      .get('/admin/best-users?start=invalid-date&end=2022-12-31')
      .expect(400);
  });
});
