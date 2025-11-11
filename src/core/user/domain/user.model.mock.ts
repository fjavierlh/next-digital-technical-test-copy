import { UserId } from "./user-id.vo";
import type { User } from "./user.model";

export const userModelMock: User = {
  id: UserId.create("1"),
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  city: "Gwenborough",
  website: "hildegard.org",
  company: "Romaguera-Crona",
  albumIds: [],
  todoListIds: [],
};
