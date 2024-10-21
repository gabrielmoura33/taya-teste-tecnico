import { IsDateString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetBestUsersDto {
  @IsDateString()
  @ApiProperty({ description: 'Start date', example: '2022-01-01' })
  start: string;

  @IsDateString()
  @ApiProperty({ description: 'End date', example: '2022-12-31' })
  end: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  @ApiPropertyOptional({ description: 'Number of items to skip', default: 0 })
  skip?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional({ description: 'Number of items to take', default: 10 })
  take?: number = 10;
}
