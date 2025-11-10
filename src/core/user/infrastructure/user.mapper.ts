import type { User } from "../domain/user.model";
import type { UserDTO } from "./user.dto";

export class UserMapper {
  readonly toDomain = (userData: UserDTO): User => ({
    id: String(userData.id),
    name: userData.name,
    username: userData.username,
    email: userData.email,
    city: userData.address.city,
    website: userData.website,
    company: userData.company?.name,
    albumIds: [],
    todoListIds: [],
  });
}
