import { usersDTOMock } from "../../core/user/infrastructure/user.dto.mock";

import { mockWebServer } from "../../../config/setupTests";
import type { MockHandler } from "./mock-web-server";
import type { UserDTO } from "../../core/user/infrastructure/user.dto";

// Response for https://jsonplaceholder.typicode.com/users/
export function givenUsers() {
  const handler: MockHandler<UserDTO[]> = {
    method: "get",
    endpoint: "https://jsonplaceholder.typicode.com/users/",
    httpStatusCode: 200,
    response: usersDTOMock,
  };
  mockWebServer.addRequestHandlers([handler]);

  return handler;
}
