import { InvalidUserIdError } from "./invalid-user-id.error";

export class UserId {
  private readonly value: string;

  constructor(value: string) {
    const isDigit = /^\d+$/.test(value);
    if (!isDigit) {
      throw new InvalidUserIdError();
    }
    this.value = value;
  }

  static isValid(value: string): boolean {
    return /^\d+$/.test(value);
  }

  toString() {
    return this.value;
  }
}
