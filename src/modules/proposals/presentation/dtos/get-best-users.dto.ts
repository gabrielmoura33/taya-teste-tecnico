import { IsDateString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetBestUsersDto {
  @IsDateString()
  @Type(() => Date)
  @ApiProperty({ description: 'Start date', example: '2022-01-01' })
  start: Date;

  @IsDateString()
  @Type(() => Date)
  @ApiProperty({ description: 'End date', example: '2022-12-31' })
  end: Date;

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
