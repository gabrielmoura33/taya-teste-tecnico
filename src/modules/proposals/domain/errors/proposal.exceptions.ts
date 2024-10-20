import { NotFoundException, BadRequestException } from '@nestjs/common';

export class ProposalNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Proposal not found');
  }
}

export class ProposalAccessDeniedException extends NotFoundException {
  constructor(message?: string) {
    super(message || 'Access to proposal denied');
  }
}

export class ProposalNotPendingException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Proposal is not pending');
  }
}
