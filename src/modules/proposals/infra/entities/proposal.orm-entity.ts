import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ProposalStatus } from '../../domain/entities/proposal-status.enum';
import { UserOrmEntity } from '../../../users/infrastructure/entities/user.orm-entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserOrmEntity, (user) => user.proposals)
  @JoinColumn({ name: 'userCreatorId' })
  userCreator: UserOrmEntity;
}
