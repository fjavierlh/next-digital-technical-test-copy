import { useParams } from "react-router-dom";
import { InvalidUserIdError } from "../../domain/invalid-user-id.error";
import { UserDetail } from "../components/user-detail";
import { useQueryUserById } from "../hooks/useQueryUserById";

export const UserDetailPage = () => {
  const { userId } = useParams();
  const { data: user, isLoading, error } = useQueryUserById(userId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const message =
      error instanceof InvalidUserIdError
        ? "Invalid user ID"
        : "Error loading user data";
    return <div>{message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return <UserDetail user={user} />;
};
