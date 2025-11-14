import { useParams } from "react-router-dom";
import { AlbumDetail } from "../components/album-detail";
import { useQueryAlbumByIdUseCase } from "../hooks/useQueryAlbumByIdUseCase";

export const AlbumDetailPage = () => {
  const { userId, albumId } = useParams();
  const {
    data: album,
    isLoading,
    error,
  } = useQueryAlbumByIdUseCase(userId!, albumId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading album</div>;
  }

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div>
      <AlbumDetail album={album} />
    </div>
  );
};
