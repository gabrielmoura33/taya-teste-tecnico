import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  findById(id: number): Promise<User | null>;
  save(user: User): Promise<User>;
}
