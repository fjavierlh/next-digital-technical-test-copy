import type { Brand } from "../../shared/domain/brand";
import type { IdFactory } from "../../shared/domain/id-factory.interface";

export type AlbumId = Brand<string, "AlbumId">;

export const AlbumId: IdFactory<AlbumId> = {
  create(value: string): AlbumId {
    if (!value || value.trim() === "") {
      throw new Error("AlbumId cannot be empty");
    }
    return value as AlbumId;
  },
  equals(id1: AlbumId, id2: AlbumId): boolean {
    return id1 === id2;
  },
};
