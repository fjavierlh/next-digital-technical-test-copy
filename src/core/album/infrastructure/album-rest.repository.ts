import type { UserId } from "../../user/domain/user-id.vo";
import { AlbumId } from "../domain/album-id.vo";
import type { Album } from "../domain/album.model";
import type { AlbumRepository } from "../domain/album.repository";
import type { AlbumDTO } from "./album.dto";

export class AlbumRestRepository implements AlbumRepository {
  async byUserId(userId: UserId): Promise<Album[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch albums");
    }

    const albums: AlbumDTO[] = await response.json();
    return albums.map<Album>((album) => ({
      id: AlbumId.create(String(album.id)),
      title: album.title,
    }));
  }
}
