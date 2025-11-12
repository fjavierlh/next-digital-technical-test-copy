import { UserId } from "../../user/domain/user-id.vo";
import { AlbumId } from "../domain/album-id.vo";
import type { Album } from "../domain/album.model";
import type { AlbumRepository } from "../domain/album.repository";
import type { PhotoRepository } from "../domain/photo.repository";

export class QueryAlbumByIdUseCase {
  private readonly albumRepository: AlbumRepository;
  private readonly photoRepository: PhotoRepository;

  constructor(
    albumRepository: AlbumRepository,
    photoRepository: PhotoRepository
  ) {
    this.albumRepository = albumRepository;
    this.photoRepository = photoRepository;
  }

  async execute(userId: string, albumId: string): Promise<Album> {
    const userIdVO = UserId.create(userId);
    const albumIdVO = AlbumId.create(albumId);
    const album = await this.albumRepository.byId(userIdVO, albumIdVO);

    if (!album) {
      throw new Error("Album not found");
    }

    const photos = await this.photoRepository.byAlbumId(albumIdVO);
    const aggregatedAlbum: Album = {
      ...album,
      photos,
    };
    return aggregatedAlbum;
  }
}
