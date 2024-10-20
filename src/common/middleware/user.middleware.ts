import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { UserOrmEntity } from '../../modules/users/infrastructure/entities/user.orm-entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserOrmEntity)
    private userRepository: Repository<UserOrmEntity>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['user_id'];
    if (userId) {
      const user = await this.userRepository.findOne({
        where: { id: Number(userId) },
      });
      if (user) {
        (req as any).user = user;
      }
    }
    next();
  }
}
