import type { AlbumId } from "../domain/album-id.vo";
import type { Photo } from "../domain/photo.model";
import type { PhotoRepository } from "../domain/photo.repository";

export class PhotoRestRepository implements PhotoRepository {
  async byAlbumId(albumId: AlbumId): Promise<Photo[]> {
    const photoResponse = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );

    if (!photoResponse.ok) {
      throw new Error("Failed to fetch photos");
    }
    const photos: Photo[] = await photoResponse.json();
    return photos;
  }
}
