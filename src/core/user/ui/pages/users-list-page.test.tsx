import { screen } from "@testing-library/react";
import { givenUsers } from "../../../../test-utils/http/given-users";
import { renderWithProviders } from "../../../../test-utils/render/render-with-providers";
import type { UserDTO } from "../../infrastructure/user.dto";
import { UsersListPage } from "./users-list-page";

describe("UserListPage", () => {
  let users: UserDTO[];
  beforeEach(() => {
    const { response } = givenUsers();
    users = response;
    renderWithProviders(<UsersListPage />);
  });

  it("should render loading state", () => {
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render a list of users", async () => {
    const firstUser = await screen.findByText(users[0].name);
    const secondUser = await screen.findByText(users[1].name);
    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
  });
});
