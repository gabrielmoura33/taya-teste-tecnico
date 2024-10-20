import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerOrmEntity } from '../entities/customer.orm-entity';
import { Repository } from 'typeorm';
import { CustomerRepositoryInterface } from '../../domain/repositories/customer.repository.interface';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private readonly ormRepository: Repository<CustomerOrmEntity>,
  ) {}

  async findById(id: number): Promise<Customer | null> {
    const customerEntity = await this.ormRepository.findOne({ where: { id } });
    return customerEntity ? this.toDomain(customerEntity) : null;
  }

  async save(customer: Customer): Promise<Customer> {
    const customerEntity = this.toOrmEntity(customer);
    const savedEntity = await this.ormRepository.save(customerEntity);
    return this.toDomain(savedEntity);
  }

  private toDomain(entity: CustomerOrmEntity): Customer {
    return new Customer(
      entity.id,
      entity.name,
      entity.cpf,
      entity.userCreatorId,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  private toOrmEntity(customer: Customer): CustomerOrmEntity {
    const entity = new CustomerOrmEntity();
    entity.id = customer.id;
    entity.name = customer.name;
    entity.cpf = customer.cpf;
    entity.userCreatorId = customer.userCreatorId;
    entity.createdAt = customer.createdAt;
    entity.updatedAt = customer.updatedAt;
    return entity;
  }
}
