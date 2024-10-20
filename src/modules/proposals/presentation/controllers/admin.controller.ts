import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetProfitByStatusGroupedByUserUseCase } from '../../application/use-cases/get-profit-by-status-grouped-by-user.use-case';
import { GetBestUsersUseCase } from '../../application/use-cases/get-best-users.use-case';
import { GetBestUsersDto } from '../dtos/get-best-users.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly getProfitByStatusGroupedByUserUseCase: GetProfitByStatusGroupedByUserUseCase,
    private readonly getBestUsersUseCase: GetBestUsersUseCase,
  ) {}

  @Get('profit-by-status')
  async getProfitByStatus() {
    return this.getProfitByStatusGroupedByUserUseCase.execute();
  }

  @Get('best-users')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBestUsers(@Query() query: GetBestUsersDto) {
    return this.getBestUsersUseCase.execute(query.start, query.end);
  }
}
