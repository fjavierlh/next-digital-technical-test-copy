import type { UserId } from "../domain/user-id.vo";
import type { User } from "../domain/user.model";
import type { UserRepository } from "../domain/user.repository";
import type { UserDTO } from "./user.dto";
import type { UserMapper } from "./user.mapper";

export class UserRestRepository implements UserRepository {
  private readonly mapper: UserMapper;

  constructor(mapper: UserMapper) {
    this.mapper = mapper;
  }

  async getAll(): Promise<User[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/");
    const usersData = await response.json();

    return usersData.map(this.mapper.toDomain);
  }

  async byId(userId: UserId): Promise<User | null> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    if (response.status === 404) {
      return null;
    }

    const userData: UserDTO = await response.json();

    return this.mapper.toDomain(userData);
  }
}
