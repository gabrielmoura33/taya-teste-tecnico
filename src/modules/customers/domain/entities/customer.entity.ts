export class Customer {
  private _id: number;
  private _name: string;
  private _cpf: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _userCreatorId: number;

  constructor(
    id: number,
    name: string,
    cpf: string,
    userCreatorId: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this._id = id;
    this._name = name;
    this._cpf = cpf;
    this._userCreatorId = userCreatorId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get cpf(): string {
    return this._cpf;
  }
  set cpf(value: string) {
    this._cpf = value;
  }

  get userCreatorId(): number {
    return this._userCreatorId;
  }
  set userCreatorId(value: number) {
    this._userCreatorId = value;
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
}
