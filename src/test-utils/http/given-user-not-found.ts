import { mockWebServer } from "../../../config/setupTests";
import type { MockHandler } from "./mock-web-server";

// 404 Not Found for https://jsonplaceholder.typicode.com/users/:userId
export function givenUserNotFound(id: string) {
  const handler: MockHandler<{ message: string }> = {
    method: "get",
    endpoint: `https://jsonplaceholder.typicode.com/users/${id}`,
    httpStatusCode: 404,
    response: { message: "User not found" },
  };
  mockWebServer.addRequestHandlers([handler]);

  return handler;
}
