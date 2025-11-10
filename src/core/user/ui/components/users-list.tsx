import { Link } from "react-router-dom";
import type { User } from "../../domain/user.model";

import React from "react";

type Props = {
  users: User[];
  loading: boolean;
};

export const UsersList: React.FC<Props> = ({ users, loading }) => {
  return (
    <ul>
      {loading
        ? "Loading..."
        : users?.map((user) => (
            <Link to={`/user/${user.id}`} key={user.id}>
              <li key={user.id}>{user.name}</li>
            </Link>
          ))}
    </ul>
  );
};
