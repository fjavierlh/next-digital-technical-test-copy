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
        : users?.map((user) => {
            const id = user.id.toString();
            return (
              <Link to={`/user/${id}`} key={id}>
                <li key={id}>{user.name}</li>
              </Link>
            );
          })}
    </ul>
  );
};
