import { ApiProperty } from '@nestjs/swagger';

export class BestUserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  totalProposal: string;
}
