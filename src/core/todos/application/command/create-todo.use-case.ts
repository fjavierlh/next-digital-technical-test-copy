import { UserId } from "../../../user/domain/user-id.vo";
import { InvalidTodoTitleError } from "../../domain/invalid-todo-title.error";
import type { TodoDraft } from "../../domain/todo.model";
import type { TodoRepository } from "../../domain/todo.repository";

export class CreateTodoUseCase {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(userId: string, draft: TodoDraft): Promise<void> {
    this.validateTitle(draft.title);
    return this.todoRepository.create(UserId.create(userId), draft);
  }

  private validateTitle(title: string): void {
    if (title.trim() === "") {
      throw new InvalidTodoTitleError("Todo title cannot be empty");
    }

    const containsDigit = /\d/.test(title);
    if (containsDigit) {
      throw new InvalidTodoTitleError("Todo title cannot contain numbers");
    }
  }
}
