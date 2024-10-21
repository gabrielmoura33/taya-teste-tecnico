import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';

@Entity('proposals')
export class ProposalOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  profit: number;

  @Column({
    type: 'text',
    default: ProposalStatus.PENDING,
  })
  status: ProposalStatus;

  @Column()
  userCreatorId: number;

  @Column()
  customerId: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
