import { useParams } from "react-router-dom";
import { useQueryAlbumsByUserIdUseCase } from "../../../album/ui/hooks/useQueryAlbumsByUserIdUseCase";
import { UserDetail } from "../../../user/ui/components/user-detail";
import { useQueryUserById } from "../../../user/ui/hooks/useQueryUserById";
import { AlbumsList } from "../../../album/ui/components/albums-list";

export const UserDetailPage = () => {
  const { userId } = useParams();
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQueryUserById(userId!);

  const {
    data: albums,
    isLoading: albumsLoading,
    error: albumsError,
  } = useQueryAlbumsByUserIdUseCase(userId!);


  return (
    <>
      <UserDetail user={user} loading={isUserLoading} error={userError} />
      <AlbumsList albums={albums} loading={albumsLoading} error={albumsError} />
    </>
  );
};
