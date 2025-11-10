import { mockWebServer } from "../../../config/setupTests";
import type { MockHandler } from "./mock-web-server";

// 404 Not Found for https://jsonplaceholder.typicode.com/users/:userId
export function givenUserInternalServerError(id: string) {
  const handler: MockHandler<null> = {
    method: "get",
    endpoint: `https://jsonplaceholder.typicode.com/users/${id}`,
    httpStatusCode: 500,
    response: null,
  };
  mockWebServer.addRequestHandlers([handler]);

  return handler;
}
