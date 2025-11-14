import { mockWebServer } from "../../../config/setupTests";
import type { MockHandler } from "./mock-web-server";

// 404 Not Found for https://jsonplaceholder.typicode.com/users/:userId/albums
export function givenAlbumsNotFound(id: string) {
  const handler: MockHandler<{ message: string }> = {
    method: "get",
    endpoint: `https://jsonplaceholder.typicode.com/users/${id}/albums`,
    httpStatusCode: 404,
    response: { message: "Albums not found" },
  };
  mockWebServer.addRequestHandlers([handler]);

  return handler;
}
