import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { givenUser } from "../../../../test-utils/http/given-user";
import { givenUserInternalServerError } from "../../../../test-utils/http/given-user-internal-server-error";
import { givenUserNotFound } from "../../../../test-utils/http/given-user-not-found";
import { renderWithProviders } from "../../../../test-utils/render/render-with-providers";
import type { UserDTO } from "../../infrastructure/user.dto";
import { UserDetailPage } from "./user-detail-page";

describe("UserDetailPage", () => {
  const userId = "1";
  let user: UserDTO;

  beforeEach(() => {
    const { response } = givenUser(userId);
    user = response;
  });

  it("should render loading state", () => {
    renderUserDetailPageHaving({ userId });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render user details", async () => {
    renderUserDetailPageHaving({ userId });
    const userName = await screen.findByText(user.name);
    const userEmail = await screen.findByText(`Email: ${user.email}`);
    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
  });

  it("should render error state for non-existing user", async () => {
    const nonExistingUserId = "999";
    givenUserNotFound(nonExistingUserId); // Mocking user not found
    renderUserDetailPageHaving({ userId: nonExistingUserId });
    const errorMessage = await screen.findByText("User not found");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render error text on fetch error", async () => {
    const errorUserId = "500";
    givenUserInternalServerError(errorUserId); // Mocking server error
    renderUserDetailPageHaving({ userId: errorUserId });
    const errorMessage = await screen.findByText("Error loading user data");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render invalid user ID message", async () => {
    renderUserDetailPageHaving({ userId: "invalid-user-id" });
    const errorMessage = await screen.findByText("Invalid user ID");
    expect(errorMessage).toBeInTheDocument();
  });
});

function renderUserDetailPageHaving({ userId }: { userId: string }) {
  renderWithProviders(
    <Routes>
      <Route path="/user/:userId" element={<UserDetailPage />} />
    </Routes>,
    {
      initialEntries: [`/user/${userId}`],
    }
  );
}
