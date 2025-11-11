import type { Mocked } from "vitest";

import { AlbumId } from "../domain/album-id.vo";
import type { Album } from "../domain/album.model";
import type { AlbumRepository } from "../domain/album.repository";
import { PhotoId } from "../domain/photo-id.vo";
import type { Photo } from "../domain/photo.model";
import type { PhotoRepository } from "../domain/photo.repository";
import { QueryAlbumsByUserIdUseCase } from "./query-all-albums-by-user-id.use-case";

describe("QueryAllAlbumsByUserIdUseCase", () => {
  let useCase: QueryAlbumsByUserIdUseCase;
  let albumRepository: Mocked<AlbumRepository>;
  let photoRepository: Mocked<PhotoRepository>;

  beforeEach(() => {
    albumRepository = {
      byUserId: vi.fn(),
    };

    photoRepository = {
      byAlbumId: vi.fn(),
    };

    useCase = new QueryAlbumsByUserIdUseCase(albumRepository, photoRepository);
  });

  it("should fetch albums and their photos for a given user ID", async () => {
    const userId = "1";
    const albums: Album[] = [
      { id: AlbumId.create("1"), title: "Album 1" },
      { id: AlbumId.create("2"), title: "Album 2" },
    ];
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
    const photosAlbum2: Photo[] = [
      {
        id: PhotoId.create("3"),
        title: "Photo 3",
        url: "",
        thumbnailUrl: "",
      },
    ];

    albumRepository.byUserId.mockResolvedValue(albums);
    photoRepository.byAlbumId
      .mockResolvedValueOnce(photosAlbum1)
      .mockResolvedValueOnce(photosAlbum2);

    const result = await useCase.execute(userId);

    expect(albumRepository.byUserId).toHaveBeenCalledWith(userId);
    expect(photoRepository.byAlbumId).toHaveBeenCalledTimes(2);
    expect(photoRepository.byAlbumId).toHaveBeenNthCalledWith(
      1,
      AlbumId.create("1")
    );
    expect(photoRepository.byAlbumId).toHaveBeenNthCalledWith(
      2,
      AlbumId.create("2")
    );

    expect(result).toEqual([
      { ...albums[0], photos: photosAlbum1 },
      { ...albums[1], photos: photosAlbum2 },
    ]);
  });
});
