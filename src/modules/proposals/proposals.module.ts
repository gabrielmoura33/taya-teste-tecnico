import { Module } from '@nestjs/common';
import { ProposalController } from './presentation/controllers/proposal.controller';
import { AdminController } from './presentation/controllers/admin.controller';
import { GetProposalByIdForUserUseCase } from './application/use-cases/get-proposal-by-id-for-user.use-case';
import { GetPendingProposalsForUserUseCase } from './application/use-cases/get-pending-proposals-for-user.use-case';
import { GetRefusedProposalsForUserUseCase } from './application/use-cases/get-refused-proposals-for-user.use-case';
import { ApproveProposalUseCase } from './application/use-cases/approve-proposal.use-case';
import { GetProfitByStatusGroupedByUserUseCase } from './application/use-cases/get-profit-by-status-grouped-by-user.use-case';
import { GetBestUsersUseCase } from './application/use-cases/get-best-users.use-case';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProposalController, AdminController],
  providers: [
    // Use-cases
    GetProposalByIdForUserUseCase,
    GetPendingProposalsForUserUseCase,
    GetRefusedProposalsForUserUseCase,
    ApproveProposalUseCase,
    GetProfitByStatusGroupedByUserUseCase,
    GetBestUsersUseCase,
  ],
})
export class ProposalsModule {}
