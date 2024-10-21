import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { ProposalOrmEntity } from '../src/modules/proposals/infra/entities/proposal.orm-entity';
import { UserOrmEntity } from '../src/modules/users/infrastructure/entities/user.orm-entity';
import { CustomerOrmEntity } from '../src/modules/customers/infrastructure/entities/customer.orm-entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProposalStatus } from '../src/modules/proposals/domain/entities/proposal-status.enum';

describe('ProposalController (e2e)', () => {
  let app: INestApplication;
  let proposalRepository: Repository<ProposalOrmEntity>;
  let userRepository: Repository<UserOrmEntity>;
  let customerRepository: Repository<CustomerOrmEntity>;

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
    customerRepository = moduleFixture.get<Repository<CustomerOrmEntity>>(
      getRepositoryToken(CustomerOrmEntity),
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
    await customerRepository.query('DELETE FROM customers');
  });

  it('GET /proposals/:id - success', async () => {
    // Create a user
    const user = await userRepository.save({
      name: 'Test User',
      balance: 0,
    });

    // Create a customer
    const customer = await customerRepository.save({
      name: 'Test Customer',
      cpf: '12345678901',
      userCreatorId: user.id,
    });

    // Create a proposal
    const proposal = await proposalRepository.save({
      profit: 1000,
      status: ProposalStatus.PENDING,
      userCreatorId: user.id,
      customerId: customer.id,
    });

    const response = await request(app.getHttpServer())
      .get(`/proposals/${proposal.id}`)
      .set('user-id', user.id.toString())
      .expect(200);

    expect(response.body).toEqual({
      id: proposal.id,
      profit: proposal.profit.toFixed(2),
      status: ProposalStatus.PENDING,
      createdAt: proposal.createdAt.toISOString(),
      updatedAt: proposal.updatedAt.toISOString(),
      userCreatorId: user.id,
      customerId: customer.id,
    });
  });

  it('GET /proposals/:id - proposal not found', async () => {
    const user = await userRepository.save({
      name: 'Test User',
      balance: 0,
    });

    await request(app.getHttpServer())
      .get('/proposals/999')
      .set('user-id', user.id.toString())
      .expect(404);
  });

  it('GET /proposals - pagination', async () => {
    const user = await userRepository.save({
      name: 'Test User',
      balance: 0,
    });

    // Create multiple proposals
    for (let i = 0; i < 15; i++) {
      await proposalRepository.save({
        profit: 100 + i,
        status: ProposalStatus.PENDING,
        userCreatorId: user.id,
        customerId: 1,
      });
    }

    const response = await request(app.getHttpServer())
      .get('/proposals?skip=0&take=10')
      .set('user-id', user.id.toString())
      .expect(200);

    expect(response.body.items.length).toBe(10);
    expect(response.body.total).toBe(15);
  });

  it('POST /proposals/:proposal_id/approve - success', async () => {
    const user = await userRepository.save({
      name: 'Test User',
      balance: 0,
    });

    const proposal = await proposalRepository.save({
      profit: 1000,
      status: ProposalStatus.PENDING,
      userCreatorId: user.id,
      customerId: 1,
    });

    await request(app.getHttpServer())
      .post(`/proposals/${proposal.id}/approve`)
      .set('user-id', user.id.toString())
      .expect(200);

    const updatedProposal = await proposalRepository.findOne({
      where: { id: proposal.id },
    });
    const updatedUser = await userRepository.findOne({
      where: { id: user.id },
    });

    expect(updatedProposal.status).toBe(ProposalStatus.SUCCESSFUL);
    expect(updatedUser.balance).toBe(proposal.profit);
  });

  it('POST /proposals/:proposal_id/approve - proposal not pending', async () => {
    const user = await userRepository.save({
      name: 'Test User',
      balance: 0,
    });

    const proposal = await proposalRepository.save({
      profit: 1000,
      status: ProposalStatus.SUCCESSFUL,
      userCreatorId: user.id,
      customerId: 1,
    });

    await request(app.getHttpServer())
      .post(`/proposals/${proposal.id}/approve`)
      .set('user-id', user.id.toString())
      .expect(400);
  });

  // Additional tests for other endpoints can be added here
});
