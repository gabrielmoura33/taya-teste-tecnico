import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import { UserRepositoryInterface } from '../../modules/users/domain/repositories/user.repository.interface';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userRepository: UserRepositoryInterface) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['user_id'];

    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    const user = await this.userRepository.findById(parseInt(userId as string));
    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    (req as any).user = user;
    next();
  }
}
