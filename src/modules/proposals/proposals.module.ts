// src/modules/proposals/proposals.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalController } from './presentation/controllers/proposal.controller';
import { AdminController } from './presentation/controllers/admin.controller';
import { ProposalOrmEntity } from './infra/entities/proposal.orm-entity';
import { UserOrmEntity } from '../users/infrastructure/entities/user.orm-entity';
import { ProposalRepository } from './infra/repositories/proposal.repository';
import { UserRepository } from '../users/infrastructure/repositories/user.repository';
import { GetProposalByIdForUserUseCase } from './application/use-cases/get-proposal-by-id-for-user.use-case';
import { GetPendingProposalsForUserUseCase } from './application/use-cases/get-pending-proposals-for-user.use-case';
import { GetRefusedProposalsForUserUseCase } from './application/use-cases/get-refused-proposals-for-user.use-case';
import { ApproveProposalUseCase } from './application/use-cases/approve-proposal.use-case';
import { GetProfitByStatusGroupedByUserUseCase } from './application/use-cases/get-profit-by-status-grouped-by-user.use-case';
import { GetBestUsersUseCase } from './application/use-cases/get-best-users.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([ProposalOrmEntity, UserOrmEntity])],
  controllers: [ProposalController, AdminController],
  providers: [
    // Use-cases
    GetProposalByIdForUserUseCase,
    GetPendingProposalsForUserUseCase,
    GetRefusedProposalsForUserUseCase,
    ApproveProposalUseCase,
    GetProfitByStatusGroupedByUserUseCase,
    GetBestUsersUseCase,
    // Repositories
    { provide: 'ProposalRepositoryInterface', useClass: ProposalRepository },
    { provide: 'UserRepositoryInterface', useClass: UserRepository },
  ],
})
export class ProposalsModule {}
