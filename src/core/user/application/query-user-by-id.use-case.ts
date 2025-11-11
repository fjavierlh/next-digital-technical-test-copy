import { UserId } from "../domain/user-id.vo";
import type { UserRepository } from "../domain/user.repository";

export class QueryUserByIdUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string) {
    const userIdVO = UserId.create(userId);
    return this.userRepository.byId(userIdVO);
  }
}
