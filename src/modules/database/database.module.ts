import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalOrmEntity } from '../proposals/infra/entities/proposal.orm-entity';
import { UserOrmEntity } from '../users/infrastructure/entities/user.orm-entity';
import { CustomerOrmEntity } from '../customers/infrastructure/entities/customer.orm-entity';
import { ProposalRepository } from '../proposals/infra/repositories/proposal.repository';
import { UserRepository } from '../users/infrastructure/repositories/user.repository';
import { CustomerRepository } from '../customers/infrastructure/repositories/customer.repository';
import { dataSourceOptions } from './configs/ormconfig';
import { CustomerRepositoryInterface } from '../customers/domain/repositories/customer.repository.interface';
import { ProposalRepositoryInterface } from '../proposals/domain/repositories/proposal.repository.interface';
import { UserRepositoryInterface } from '../users/domain/repositories/user.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProposalOrmEntity,
      UserOrmEntity,
      CustomerOrmEntity,
    ]),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  providers: [
    ProposalRepository,
    UserRepository,
    CustomerRepository,
    {
      provide: ProposalRepositoryInterface,

      useClass: ProposalRepository,
    },
    {
      provide: UserRepositoryInterface,
      useClass: UserRepository,
    },
    {
      provide: CustomerRepositoryInterface,
      useClass: CustomerRepository,
    },
  ],
  exports: [
    ProposalRepositoryInterface,
    UserRepositoryInterface,
    CustomerRepositoryInterface,
    TypeOrmModule,
  ],
})
export class DatabaseModule {}
