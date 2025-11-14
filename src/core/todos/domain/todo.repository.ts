import type { UserId } from "../../user/domain/user-id.vo";
import type { TodoId } from "./todo-id.vo";
import type { Todo } from "./todo.model";

export interface TodoRepository {
  byId(todoId: TodoId): Promise<Todo | null>;
  byUserId(userId: UserId): Promise<Todo[]>;
  create(todo: Todo): Promise<void>;
  delete(todoId: TodoId): Promise<void>;
}
