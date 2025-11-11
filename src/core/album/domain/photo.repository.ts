import type { AlbumId } from "./album-id.vo";
import type { Photo } from "./photo.model";

export interface PhotoRepository {
  byAlbumId(albumId: AlbumId): Promise<Photo[]>;
}
