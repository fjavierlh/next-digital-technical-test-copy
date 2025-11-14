import type { AlbumId } from "../domain/album-id.vo";
import { PhotoId } from "../domain/photo-id.vo";
import type { Photo } from "../domain/photo.model";
import type { PhotoRepository } from "../domain/photo.repository";
import type { PhotoDTO } from "./photo.dto";
import { transformPhotoUrl } from "./utils/transform-photo-url";

export class PhotoRestRepository implements PhotoRepository {
  async byAlbumId(albumId: AlbumId): Promise<Photo[]> {
    const photoResponse = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );

    if (!photoResponse.ok) {
      throw new Error("Failed to fetch photos");
    }
    const photos: PhotoDTO[] = await photoResponse.json();

    return photos.map((photo) => ({
      id: PhotoId.create(String(photo.id)),
      title: photo.title,
      url: transformPhotoUrl(photo.url),
      thumbnailUrl: transformPhotoUrl(photo.thumbnailUrl),
    }));
  }
}
