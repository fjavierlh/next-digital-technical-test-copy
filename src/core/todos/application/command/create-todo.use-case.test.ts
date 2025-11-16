import type { Mocked } from "vitest";
import type { TodoRepository } from "../../domain/todo.repository";
import { CreateTodoUseCase } from "./create-todo.use-case";

describe("CreateTodoUseCase", () => {
  let useCase: CreateTodoUseCase;
  let todoRepository: Mocked<TodoRepository>;

  beforeEach(() => {
    todoRepository = {
      byUserId: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    };

    useCase = new CreateTodoUseCase(todoRepository);
  });

  it("should create a new todo for a given user", async () => {
    const userId = "1";
    const title = "New Todo";

    await useCase.execute(userId, { title, completed: false });

    expect(todoRepository.create).toHaveBeenCalledWith(userId, {
      title,
      completed: false,
    });
  });
});
