import { UserId } from "../../user/domain/user-id.vo";
import { AlbumId } from "../domain/album-id.vo";
import type { AlbumRepository } from "../domain/album.repository";
import type { PhotoRepository } from "../domain/photo.repository";

export class QueryAlbumsByUserIdUseCase {
  private readonly albumRepository: AlbumRepository;
  private readonly photoRepository: PhotoRepository;

  constructor(
    albumRepository: AlbumRepository,
    photoRepository: PhotoRepository
  ) {
    this.albumRepository = albumRepository;
    this.photoRepository = photoRepository;
  }

  async execute(userId: string) {
    const userIdVO = UserId.create(userId);
    const userAlbums = await this.albumRepository.byUserId(userIdVO);
    const albumsIds = userAlbums.map((album) => AlbumId.create(album.id));
    const allPhotos = await Promise.all(
      albumsIds.map((albumId) => this.photoRepository.byAlbumId(albumId))
    );
    const aggregatedAlbum = userAlbums.map((album, index) => ({
      ...album,
      photos: allPhotos[index],
    }));

    return aggregatedAlbum;
  }
}
