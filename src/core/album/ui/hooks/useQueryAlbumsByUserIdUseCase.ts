import { useQuery } from "@tanstack/react-query";
import { QueryAlbumsByUserIdUseCase } from "../../application/query-all-albums-by-user-id.use-case";
import { AlbumRestRepository } from "../../infrastructure/album-rest.repository";
import { PhotoRestRepository } from "../../infrastructure/photo-rest.repository";

export const useQueryAlbumsByUserIdUseCase = (userId: string) => {
  return useQuery({
    queryKey: ["albums", userId],
    queryFn: async () =>
      new QueryAlbumsByUserIdUseCase(
        new AlbumRestRepository(),
        new PhotoRestRepository()
      ).execute(userId),
  });
};
