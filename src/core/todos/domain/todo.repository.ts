import type { UserId } from "../../user/domain/user-id.vo";
import type { TodoId } from "./todo-id.vo";
import type { Todo, TodoDraft } from "./todo.model";

export interface TodoRepository {
  byUserId(userId: UserId): Promise<Todo[]>;
  create(userId: UserId, draft: TodoDraft): Promise<void>;
  delete(todoId: TodoId): Promise<void>;
}
