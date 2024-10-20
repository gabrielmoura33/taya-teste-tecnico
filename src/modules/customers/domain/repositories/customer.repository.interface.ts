import { Customer } from '../entities/customer.entity';

export interface CustomerRepositoryInterface {
  findById(id: number): Promise<Customer | null>;
  save(customer: Customer): Promise<Customer>;
}
