import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { givenAlbums } from "../../../../test-utils/http/given-albums";
import { givenPhotos } from "../../../../test-utils/http/given-photos";
import { givenUser } from "../../../../test-utils/http/given-user";
import { givenUserInternalServerError } from "../../../../test-utils/http/given-user-internal-server-error";
import { givenUserNotFound } from "../../../../test-utils/http/given-user-not-found";
import { renderWithProviders } from "../../../../test-utils/render/render-with-providers";
import type { UserDTO } from "../../../user/infrastructure/user.dto";
import { UserDetailPage } from "./user-detail-page";
import { givenAlbumsNotFound } from "../../../../test-utils/http/given-albums-not-found";
import type { AlbumDTO } from "../../../album/infrastructure/album.dto";

describe("UserDetailPage", () => {
  const userId = "1";
  let user: UserDTO;
  let albums: AlbumDTO[];

  beforeEach(() => {
    const { response } = givenUser(userId);
    user = response;
    const { response: albumsResponse } = givenAlbums(userId);
    albums = albumsResponse;
    givenPhotos();
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

    for (const album of albums) {
      const albumTitle = await screen.findByText(album.title);
      expect(albumTitle).toBeInTheDocument();
    }
  });

  it("should render error state for non-existing user", async () => {
    const nonExistingUserId = "999";
    givenUserNotFound(nonExistingUserId);
    givenAlbumsNotFound(nonExistingUserId);
    renderUserDetailPageHaving({ userId: nonExistingUserId });
    const errorMessage = await screen.findByText("User not found");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render error text on fetch error", async () => {
    const errorUserId = "500";
    givenUserInternalServerError(errorUserId);
    givenAlbums(errorUserId);
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
