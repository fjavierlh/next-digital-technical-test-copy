import type { TodoId } from "./todo-id.vo";

export type Todo = {
  id: TodoId;
  title: string;
  completed: boolean;
};

export type TodoDraft = Omit<Todo, "id">;
