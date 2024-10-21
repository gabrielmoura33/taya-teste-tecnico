import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ProposalNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Proposal not found');
  }
}

export class ProposalNotFoundResponse {
  @ApiProperty({ default: 404 })
  statusCode: number;

  @ApiProperty({ default: 'Not Found' })
  error: string;

  @ApiProperty({ default: 'Proposal not found' })
  message: string;
}

export class ProposalAccessDeniedException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Access to proposal denied');
  }
}

export class ProposalAccessDeniedResponse {
  @ApiProperty({ default: 404 })
  statusCode: number;

  @ApiProperty({ default: 'Not Found' })
  error: string;

  @ApiProperty({ default: 'Access to proposal denied' })
  message: string;
}

export class ProposalNotPendingException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Proposal is not pending');
  }
}

export class ProposalNotPendingResponse {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({ default: 'Bad Request' })
  error: string;

  @ApiProperty({ default: 'Proposal is not pending' })
  message: string;
}
