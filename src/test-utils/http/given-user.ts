import { usersDTOMock } from "../../core/user/infrastructure/user.dto.mock";

import { mockWebServer } from "../../../config/setupTests";
import type { MockHandler } from "./mock-web-server";
import type { UserDTO } from "../../core/user/infrastructure/user.dto";

// Response for https://jsonplaceholder.typicode.com/users/:userId
export function givenUser(id: string) {
  const handler: MockHandler<UserDTO> = {
    method: "get",
    endpoint: `https://jsonplaceholder.typicode.com/users/${id}`,
    httpStatusCode: 200,
    response: { ...usersDTOMock[0], id: Number(id) },
  };
  mockWebServer.addRequestHandlers([handler]);

  return handler;
}
