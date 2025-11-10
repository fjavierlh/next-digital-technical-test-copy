export class InvalidUserIdError extends Error {
  constructor(message?: string) {
    super(message || "Invalid user ID");
    this.name = "InvalidUserIdError";
  }
}
