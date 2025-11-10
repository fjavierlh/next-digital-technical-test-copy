import { UsersList } from "../components/users-list";
import { useQueryAllUsers } from "../hooks/useQueryAllUsers";

export const UsersListPage = () => {
  const { data: users, isLoading } = useQueryAllUsers();
  return <UsersList users={users ?? []} loading={isLoading} />;
};
