import type { User } from "../../domain/user.model";

type Props = {
  user: User;
};

export const UserDetail: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>City: {user.city}</p>
      {user.website && <p>Website: {user.website}</p>}
      {user.company && <p>Company: {user.company}</p>}
      <p>Albums:</p>
      <p>Todo Lists:</p>
    </div>
  );
};
