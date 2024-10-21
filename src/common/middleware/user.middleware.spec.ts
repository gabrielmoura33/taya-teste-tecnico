import { UserMiddleware } from './user.middleware';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../../modules/users/infrastructure/entities/user.orm-entity';

describe('UserMiddleware', () => {
  let middleware: UserMiddleware;
  let userRepository: jest.Mocked<Repository<UserOrmEntity>>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
    } as any;

    middleware = new UserMiddleware(userRepository as any);
  });

  it('should attach user to request if user-id header is present and valid', async () => {
    const req: any = {
      headers: { 'user-id': '1' },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    const user = new UserOrmEntity();
    user.id = 1;
    userRepository.findOne.mockResolvedValue(user);

    await middleware.use(req, res, next);

    expect(req.user).toBe(user);
    expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(next).toHaveBeenCalled();
  });

  it('should respond with 401 if user not found', async () => {
    const req: any = {
      headers: { 'user-id': '1' },
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    userRepository.findOne.mockResolvedValue(null);

    await middleware.use(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized user' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should respond with 400 if user-id header is missing', async () => {
    const req: any = {
      headers: {},
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await middleware.use(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Missing user-id header',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
