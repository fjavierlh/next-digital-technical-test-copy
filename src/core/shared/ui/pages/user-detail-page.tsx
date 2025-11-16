import { useParams } from "react-router-dom";
import { useQueryAlbumsByUserIdUseCase } from "../../../album/ui/hooks/useQueryAlbumsByUserIdUseCase";
import { UserDetail } from "../../../user/ui/components/user-detail";
import { useQueryUserById } from "../../../user/ui/hooks/useQueryUserById";
import { AlbumsList } from "../../../album/ui/components/albums-list";
import { useQueryTodoListByUserIdUseCase } from "../../../todos/ui/hooks/useQueryTodoListByUserIdUseCase";
import { TodoList } from "../../../todos/ui/components/todo-list";

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

  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError,
  } = useQueryTodoListByUserIdUseCase(userId!);

  return (
    <>
      <UserDetail user={user} loading={isUserLoading} error={userError} />
      <AlbumsList albums={albums} loading={albumsLoading} error={albumsError} />
      <TodoList todos={todos} loading={todosLoading} error={todosError} />
    </>
  );
};
