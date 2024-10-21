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
import { Documentation } from '../../../../common/decorators/documentation.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfitByStatusResponseDto } from '../dtos/profit-by-status-response.dto';
import { BestUserResponseDto } from '../dtos/best-user-response.dto';

@Controller('admin')
@ApiBearerAuth()
@ApiTags('Proposals')
export class AdminController {
  constructor(
    private readonly getProfitByStatusGroupedByUserUseCase: GetProfitByStatusGroupedByUserUseCase,
    private readonly getBestUsersUseCase: GetBestUsersUseCase,
  ) {}

  @Get('profit-by-status')
  @Documentation({
    title: 'Get Profit by Status Grouped by User',
    description: 'Retrieve profit grouped by proposal status and user.',
    responses: [
      {
        status: 200,
        description: 'Profit data retrieved successfully',
        type: [ProfitByStatusResponseDto],
      },
    ],
  })
  async getProfitByStatus() {
    return this.getProfitByStatusGroupedByUserUseCase.execute();
  }

  @Get('best-users')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Documentation({
    title: 'Get Best Users',
    description: 'Retrieve best users by profit within a date range.',
    responses: [
      {
        status: 200,
        description: 'Best users retrieved successfully',
        type: [BestUserResponseDto],
      },
    ],
  })
  async getBestUsers(@Query() query: GetBestUsersDto) {
    const { start, end } = query;

    const startDate = new Date(start);
    const endDate = new Date(end);

    return this.getBestUsersUseCase.execute(startDate, endDate);
  }
}
