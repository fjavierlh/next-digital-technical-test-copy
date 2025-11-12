import { InvalidUserIdError } from "../../domain/invalid-user-id.error";
import type { User } from "../../domain/user.model";

type Props = {
  user?: User | null;
  loading?: boolean;
  error?: Error | null;
};

export const UserDetail: React.FC<Props> = ({ user, loading, error }) => {
  if (loading) {
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

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>City: {user.city}</p>
      {user.website && <p>Website: {user.website}</p>}
      {user.company && <p>Company: {user.company}</p>}
    </div>
  );
};
