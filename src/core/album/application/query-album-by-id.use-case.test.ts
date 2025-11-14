import type { Mocked } from "vitest";

import { AlbumId } from "../domain/album-id.vo";
import type { Album } from "../domain/album.model";
import type { AlbumRepository } from "../domain/album.repository";
import { PhotoId } from "../domain/photo-id.vo";
import type { Photo } from "../domain/photo.model";
import type { PhotoRepository } from "../domain/photo.repository";
import { QueryAlbumByIdUseCase } from "./query-album-by-id.use-case";

describe("QueryAlbumByIdUseCase", () => {
  let useCase: QueryAlbumByIdUseCase;
  let albumRepository: Mocked<AlbumRepository>;
  let photoRepository: Mocked<PhotoRepository>;

  beforeEach(() => {
    albumRepository = {
      byId: vi.fn(),
      byUserId: vi.fn(),
    };

    photoRepository = {
      byAlbumId: vi.fn(),
    };

    useCase = new QueryAlbumByIdUseCase(albumRepository, photoRepository);
  });

  it("should fetch albums and their photos for a given user ID", async () => {
    const userId = "1";
    const albumId = "1";
    const album: Album = { id: AlbumId.create(albumId), title: "Album 1" };
    const photosAlbum1: Photo[] = [
      {
        id: PhotoId.create("1"),
        title: "Photo 1",
        url: "",
        thumbnailUrl: "",
      },
      {
        id: PhotoId.create("2"),
        title: "Photo 2",
        url: "",
        thumbnailUrl: "",
      },
    ];

    albumRepository.byId.mockResolvedValue(album);
    photoRepository.byAlbumId.mockResolvedValue(photosAlbum1);

    const result = await useCase.execute(userId, albumId);

    expect(albumRepository.byId).toHaveBeenCalledWith(
      userId,
      AlbumId.create(albumId)
    );
    expect(photoRepository.byAlbumId).toHaveBeenCalledTimes(1);
    expect(photoRepository.byAlbumId).toHaveBeenCalledWith(
      AlbumId.create(albumId)
    );

    expect(result).toEqual({
      ...album,
      photos: photosAlbum1,
    });
  });
});
