import { TodoId } from "../../domain/todo-id.vo";
import type { TodoRepository } from "../../domain/todo.repository";

export class DeleteTodoUseCase {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository) {
    this.todoRepository = todoRepository;
  }

  async execute(todoId: string): Promise<void> {
    const todoIdVO = TodoId.create(todoId);
    await this.todoRepository.delete(todoIdVO);
  }
}
