import { TodoId } from "./todo-id.vo";
import type { Todo } from "./todo.model";

export const todoListMock: Todo[] = [
  {
    id: TodoId.create("1"),
    title: "Buy groceries",
    completed: false,
  },
  {
    id: TodoId.create("2"),
    title: "Walk the dog",
    completed: true,
  },
];
