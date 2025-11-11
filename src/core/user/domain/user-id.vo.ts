import type { Brand } from "../../shared/domain/brand";
import type { IdFactory } from "../../shared/domain/id-factory.interface";
import { InvalidUserIdError } from "./invalid-user-id.error";

export type UserId = Brand<string, "UserId">;

export const UserId: IdFactory<UserId> = {
  create(value: string): UserId {
    if (!value || value.trim() === "") {
      throw new Error("UserId cannot be empty");
    }

    const isDigit = /^\d+$/.test(value);
    if (!isDigit || value === "0") {
      throw new InvalidUserIdError();
    }

    return value as UserId;
  },
  equals(id1: UserId, id2: UserId): boolean {
    return id1 === id2;
  },
};
