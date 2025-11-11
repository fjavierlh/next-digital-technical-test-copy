import type { UserId } from "./user-id.vo";
import type { User } from "./user.model";

export interface UserRepository {
  getAll(): Promise<User[]>;
  byId(userId: UserId): Promise<User | null>;
}
