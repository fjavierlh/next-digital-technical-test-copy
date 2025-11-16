import { mockWebServer } from "../../../config/setupTests";
import type { TodoDTO } from "../../core/todos/infrastructure/todo.dto";
import { todosDtoMock } from "../../core/todos/infrastructure/todo.dto.mock";
import type { MockHandler } from "./mock-web-server";

// Response for https://jsonplaceholder.typicode.com/users/:userId/todos
export function givenTodos(userId: string) {
  const handler: MockHandler<TodoDTO[]> = {
    method: "get",
    endpoint: `https://jsonplaceholder.typicode.com/user/${userId}/todos`,
    httpStatusCode: 200,
    response: todosDtoMock.filter((todo) => todo.userId === Number(userId)),
  };
  mockWebServer.addRequestHandlers([handler]);

  return handler;
}
