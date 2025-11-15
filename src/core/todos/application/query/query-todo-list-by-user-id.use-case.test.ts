import type { Mocked } from "vitest";
import { todoListMock } from "../../domain/todo.model.mock";
import type { TodoRepository } from "../../domain/todo.repository";
import { QueryTodoListByUserIdUseCase } from "./query-todo-list-by-user-id.use-case";

describe("QueryTodoListByUserIdUseCase", () => {
  let useCase: QueryTodoListByUserIdUseCase;
  let todoRepository: Mocked<TodoRepository>;

  beforeEach(() => {
    todoRepository = {
      byId: vi.fn(),
      byUserId: vi.fn().mockResolvedValue(todoListMock),
      create: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new QueryTodoListByUserIdUseCase(todoRepository);
  });

  it("should return all todos for a given user", async () => {
    const userId = "1";
    const result = await useCase.execute(userId);

    expect(todoRepository.byUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(todoListMock);
  });
});
