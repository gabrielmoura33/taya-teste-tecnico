import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { Repository } from 'typeorm';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepository: Repository<UserOrmEntity>,
  ) {}

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.ormRepository.findOne({ where: { id } });
    return userEntity ? this.toDomain(userEntity) : null;
  }

  async save(user: User): Promise<User> {
    const userEntity = this.toOrmEntity(user);
    const savedEntity = await this.ormRepository.save(userEntity);
    return this.toDomain(savedEntity);
  }

  private toDomain(entity: UserOrmEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.balance,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  private toOrmEntity(user: User): UserOrmEntity {
    const entity = new UserOrmEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.balance = user.balance;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    return entity;
  }
}
