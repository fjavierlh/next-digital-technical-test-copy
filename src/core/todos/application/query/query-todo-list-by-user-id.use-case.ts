import { UserId } from "../../../user/domain/user-id.vo";
import type { TodoRepository } from "../../domain/todo.repository";

export class QueryTodoListByUserIdUseCase {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(userId: string) {
    const userIdVO = UserId.create(userId);
    return this.todoRepository.byUserId(userIdVO);
  }
}
