import { UserId } from "../../user/domain/user-id.vo";
import type { TodoDraft } from "../domain/todo.model";
import type { TodoRepository } from "../domain/todo.repository";

export class CreateTodoUseCase {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(userId: string, draft: TodoDraft): Promise<void> {
    return this.todoRepository.create(UserId.create(userId), draft);
  }
}
