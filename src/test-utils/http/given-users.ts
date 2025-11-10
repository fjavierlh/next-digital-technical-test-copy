import { usersDTOMock } from "../../core/user/infrastructure/user.dto.mock";

import { mockWebServer } from "../../../config/setupTests";

// Response for https://jsonplaceholder.typicode.com/users/
export function givenUsers() {
  mockWebServer.addRequestHandlers([
    {
      method: "get",
      endpoint: "https://jsonplaceholder.typicode.com/users/",
      httpStatusCode: 200,
      response: usersDTOMock,
    },
  ]);
}
