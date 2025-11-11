import type { UserId } from "../../user/domain/user-id.vo";
import type { Album } from "./album.model";

export interface AlbumRepository {
  byUserId(userId: UserId): Promise<Album[]>;
}
