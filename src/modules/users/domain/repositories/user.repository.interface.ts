import { User } from '../entities/user.entity';

export abstract class UserRepositoryInterface {
  abstract findById(id: number): Promise<User | null>;
  abstract save(user: User): Promise<User>;
}
