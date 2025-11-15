import type { Mocked } from "vitest";
import type { TodoRepository } from "../../domain/todo.repository";
import { DeleteTodoUseCase } from "./delete-todo.use-case";
import { TodoId } from "../../domain/todo-id.vo";

describe("DeleteTodoUseCase", () => {
  let useCase: DeleteTodoUseCase;
  let todoRepository: Mocked<TodoRepository>;

  beforeEach(() => {
    todoRepository = {
      byId: vi.fn(),
      byUserId: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new DeleteTodoUseCase(todoRepository);
  });

  it("should delete a todo by its ID", async () => {
    const todoId = "1";
    const expectedTodoId = TodoId.create(todoId);
    await useCase.execute(todoId);
    expect(todoRepository.delete).toHaveBeenCalledWith(expectedTodoId);
  });
});
