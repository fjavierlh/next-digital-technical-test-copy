import type { Brand } from "../../shared/domain/brand";
import type { IdFactory } from "../../shared/domain/id-factory.interface";

export type PhotoId = Brand<string, "PhotoId">;

export const PhotoId: IdFactory<PhotoId> = {
  create(value: string): PhotoId {
    if (!value || value.trim() === "") {
      throw new Error("PhotoId cannot be empty");
    }
    return value as PhotoId;
  },
  equals(id1: PhotoId, id2: PhotoId): boolean {
    return id1 === id2;
  },
};
