import { render, screen } from "@testing-library/react";
import { RouterWrapper } from "../../../../test-utils/render/router-wrapper";
import type { User } from "../../domain/user.model";
import { userModelMock } from "../../domain/user.model.mock";
import { UsersList } from "./users-list";

describe("UsersList", () => {
  it("should render ", () => {
    renderUsersListHaving({ users: [], loading: false });
  });

  it("should render loading state", () => {
    renderUsersListHaving({ users: [], loading: true });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render a list of users", () => {
    const users = [userModelMock];
    renderUsersListHaving({ users });
    expect(screen.getByText(userModelMock.name)).toBeInTheDocument();
  });
});

function renderUsersListHaving({
  users = [],
  loading = false,
}: {
  users: User[];
  loading?: boolean;
}) {
  render(
    <RouterWrapper>
      <UsersList users={users} loading={loading} />
    </RouterWrapper>
  );
}
