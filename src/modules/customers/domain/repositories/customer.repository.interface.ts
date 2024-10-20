import { Customer } from '../entities/customer.entity';

export abstract class CustomerRepositoryInterface {
  abstract findById(id: number): Promise<Customer | null>;
  abstract save(customer: Customer): Promise<Customer>;
}
