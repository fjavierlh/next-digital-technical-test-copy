export class InvalidTodoTitleError extends Error {
  constructor(message?: string ) {
    super(message ?? "Invalid todo title");
    this.name = "InvalidTodoTitleError";
  }
}
