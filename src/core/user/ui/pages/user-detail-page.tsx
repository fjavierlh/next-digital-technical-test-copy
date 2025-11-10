import { useParams } from "react-router-dom";
import { UserDetail } from "../components/user-detail";
import { useQueryUserById } from "../hooks/useQueryUserById";

export const UserDetailPage = () => {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useQueryUserById(userId!);
  if (!user) {
    return <div>User not found</div>;
  }

  if (userId === undefined) {
    return <div>Invalid user ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return <UserDetail user={user} />;
};
