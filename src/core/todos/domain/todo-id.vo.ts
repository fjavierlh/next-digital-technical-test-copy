import type { Brand } from "../../shared/domain/brand";
import type { IdFactory } from "../../shared/domain/id-factory.interface";

export type TodoId = Brand<string, "TodoId">;

export const TodoId: IdFactory<TodoId> = {
  create(value: string): TodoId {
    if (!value || value.trim() === "") {
      throw new Error("TodoId cannot be empty");
    }

    const isDigit = /^\d+$/.test(value);
    if (!isDigit || value === "0") {
      throw new Error("Invalid TodoId");
    }

    return value as TodoId;
  },
  equals(id1: TodoId, id2: TodoId): boolean {
    return id1 === id2;
  },
};
