import { useQuery } from "@tanstack/react-query";
import { QueryAlbumByIdUseCase } from "../../application/query-album-by-id.use-case";
import { AlbumRestRepository } from "../../infrastructure/album-rest.repository";
import { PhotoRestRepository } from "../../infrastructure/photo-rest.repository";

export const useQueryAlbumByIdUseCase = (userId: string, albumId: string) => {
  return useQuery({
    queryKey: ["album", userId, albumId],
    queryFn: async () =>
      new QueryAlbumByIdUseCase(
        new AlbumRestRepository(),
        new PhotoRestRepository()
      ).execute(userId, albumId),
  });
};
