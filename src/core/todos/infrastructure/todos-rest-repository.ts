import type { UserId } from "../../user/domain/user-id.vo";
import { TodoId } from "../domain/todo-id.vo";
import type { Todo, TodoDraft } from "../domain/todo.model";
import type { TodoRepository } from "../domain/todo.repository";
import type { TodoDTO } from "./todo.dto";

export class TodosRestRepository implements TodoRepository {
  async byUserId(userId: UserId): Promise<Todo[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const todosData: Array<TodoDTO> = await response.json();

    return todosData.map<Todo>((todo) => ({
      id: TodoId.create(String(todo.id)),
      title: todo.title,
      completed: todo.completed,
    }));
  }

  async create(userId: UserId, draft: TodoDraft): Promise<void> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, ...draft }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create todo");
    }

    return;
  }

  async delete(todoId: TodoId): Promise<void> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    return;
  }
}
