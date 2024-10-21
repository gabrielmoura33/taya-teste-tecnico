import { UserMiddleware } from './user.middleware';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepositoryInterface } from '../../modules/users/domain/repositories/user.repository.interface';
import { User } from '../../modules/users/domain/entities/user.entity';

describe('UserMiddleware', () => {
  let middleware: UserMiddleware;
  let userRepository: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as any;

    middleware = new UserMiddleware(userRepository);
  });

  it('should attach user to request if user_id header is present and valid', async () => {
    const req: any = {
      headers: { user_id: '1' },
    };
    const res: any = {};
    const next = jest.fn();
    const user = new User(1, 'Test User', 1000, new Date(), new Date());
    userRepository.findById.mockResolvedValue(user);

    await middleware.use(req, res, next);

    expect(req.user).toBe(user);
    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(next).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if user_id header is missing', async () => {
    const req: any = {
      headers: {},
    };
    const res: any = {};
    const next = jest.fn();

    await expect(middleware.use(req, res, next)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(userRepository.findById).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user_id header is present but user is not found', async () => {
    const req: any = {
      headers: { user_id: '1' },
    };
    const res: any = {};
    const next = jest.fn();
    userRepository.findById.mockResolvedValue(null);

    await middleware.use(req, res, next);

    expect(req.user).toBeUndefined();
    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(next).toHaveBeenCalled();
  });
});
