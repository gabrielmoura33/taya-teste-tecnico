import { ProposalStatus } from './proposal-status.enum';

export class Proposal {
  private _id: number;
  private _profit: number;
  private _status: ProposalStatus;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _userCreatorId: number;
  private _customerId: number;

  constructor(
    id: number,
    profit: number,
    status: ProposalStatus,
    userCreatorId: number,
    customerId: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._profit = profit;
    this._status = status;
    this._userCreatorId = userCreatorId;
    this._customerId = customerId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get profit(): number {
    return this._profit;
  }
  set profit(value: number) {
    this._profit = value;
  }

  get status(): ProposalStatus {
    return this._status;
  }
  set status(value: ProposalStatus) {
    this._status = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get userCreatorId(): number {
    return this._userCreatorId;
  }
  set userCreatorId(value: number) {
    this._userCreatorId = value;
  }

  get customerId(): number {
    return this._customerId;
  }
  set customerId(value: number) {
    this._customerId = value;
  }
}
