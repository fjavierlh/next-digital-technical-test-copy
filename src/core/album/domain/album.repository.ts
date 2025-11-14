import type { UserId } from "../../user/domain/user-id.vo";
import type { AlbumId } from "./album-id.vo";
import type { Album } from "./album.model";

export interface AlbumRepository {
  byId(userId: UserId, albumId: AlbumId): Promise<Album | null>;
  byUserId(userId: UserId): Promise<Album[]>;
}
