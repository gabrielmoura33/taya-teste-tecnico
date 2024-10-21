import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalOrmEntity } from '../entities/proposal.orm-entity';
import { Repository } from 'typeorm';
import { ProposalRepositoryInterface } from '../../domain/repositories/proposal.repository.interface';
import { Proposal } from '../../domain/entities/proposal.entity';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';

@Injectable()
export class ProposalRepository implements ProposalRepositoryInterface {
  constructor(
    @InjectRepository(ProposalOrmEntity)
    private readonly ormRepository: Repository<ProposalOrmEntity>,
  ) {}

  async findById(id: number): Promise<Proposal | null> {
    const proposalEntity = await this.ormRepository.findOne({ where: { id } });
    return proposalEntity ? this.toDomain(proposalEntity) : null;
  }

  async findByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<{ items: Proposal[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      where: { userCreatorId: userId },
      skip,
      take,
    });
    const items = entities.map(this.toDomain);
    return { items, total };
  }

  async findPendingByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<{ items: Proposal[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      where: { userCreatorId: userId, status: ProposalStatus.PENDING },
      skip,
      take,
    });
    const items = entities.map(this.toDomain);
    return { items, total };
  }

  async findRefusedByUserId(
    userId: number,
    skip: number,
    take: number,
  ): Promise<{ items: Proposal[]; total: number }> {
    const [entities, total] = await this.ormRepository.findAndCount({
      where: { userCreatorId: userId, status: ProposalStatus.REFUSED },
      skip,
      take,
    });
    const items = entities.map(this.toDomain);
    return { items, total };
  }

  async save(proposal: Proposal): Promise<Proposal> {
    const proposalEntity = this.toOrmEntity(proposal);
    const savedEntity = await this.ormRepository.save(proposalEntity);
    return this.toDomain(savedEntity);
  }

  async getProfitByStatusGroupedByUser(): Promise<any> {
    const result = await this.ormRepository
      .createQueryBuilder('proposal')
      .select('proposal.userCreatorId', 'userId')
      .addSelect('proposal.status', 'status')
      .addSelect('SUM(proposal.profit)', 'totalProfit')
      .groupBy('proposal.userCreatorId')
      .addGroupBy('proposal.status')
      .getRawMany();

    return result;
  }

  async getBestUsersByProfit(startDate: Date, endDate: Date): Promise<any> {
    const result = await this.ormRepository
      .createQueryBuilder('proposal')
      .select('proposal.userCreatorId', 'id')
      .addSelect('user.name', 'fullName')
      .addSelect('SUM(proposal.profit)', 'totalProposal')
      .innerJoin('users', 'user', 'user.id = proposal.userCreatorId')
      .where('proposal.status = :status', {
        status: ProposalStatus.SUCCESSFUL,
      })
      .andWhere('proposal.createdAt BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      })
      .groupBy('proposal.userCreatorId')
      .addGroupBy('user.name')
      .orderBy('totalProposal', 'DESC')
      .getRawMany();

    return result;
  }

  private toDomain(entity: ProposalOrmEntity): Proposal {
    return new Proposal(
      entity.id,
      entity.profit,
      entity.status,
      entity.userCreatorId,
      entity.customerId,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  private toOrmEntity(proposal: Proposal): ProposalOrmEntity {
    const entity = new ProposalOrmEntity();
    entity.id = proposal.id;
    entity.profit = proposal.profit;
    entity.status = proposal.status;
    entity.userCreatorId = proposal.userCreatorId;
    entity.customerId = proposal.customerId;
    entity.createdAt = proposal.createdAt;
    entity.updatedAt = proposal.updatedAt;
    return entity;
  }
}
