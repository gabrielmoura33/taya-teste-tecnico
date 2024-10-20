import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalOrmEntity } from '../proposals/infra/entities/proposal.orm-entity';
import { UserOrmEntity } from '../users/infrastructure/entities/user.orm-entity';
import { CustomerOrmEntity } from '../customers/infrastructure/entities/customer.orm-entity';
import { ProposalRepository } from '../proposals/infra/repositories/proposal.repository';
import { UserRepository } from '../users/infrastructure/repositories/user.repository';
import { CustomerRepository } from '../customers/infrastructure/repositories/customer.repository';
import { dataSourceOptions } from './configs/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([
      ProposalOrmEntity,
      UserOrmEntity,
      CustomerOrmEntity,
    ]),
  ],
  providers: [
    ProposalRepository,
    UserRepository,
    CustomerRepository,
    {
      provide: 'ProposalRepositoryInterface',
      useClass: ProposalRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'CustomerRepositoryInterface',
      useClass: CustomerRepository,
    },
  ],
  exports: [
    ProposalRepository,
    UserRepository,
    CustomerRepository,
    {
      provide: 'ProposalRepositoryInterface',
      useClass: ProposalRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    {
      provide: 'CustomerRepositoryInterface',
      useClass: CustomerRepository,
    },
    TypeOrmModule,
  ],
})
export class DatabaseModule {}
