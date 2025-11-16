import { screen, waitFor, within } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { givenAlbums } from "../../../../test-utils/http/given-albums";
import { givenAlbumsNotFound } from "../../../../test-utils/http/given-albums-not-found";
import { givenPhotos } from "../../../../test-utils/http/given-photos";
import { givenTodos } from "../../../../test-utils/http/given-todos";
import { givenUser } from "../../../../test-utils/http/given-user";
import { givenUserInternalServerError } from "../../../../test-utils/http/given-user-internal-server-error";
import { givenUserNotFound } from "../../../../test-utils/http/given-user-not-found";
import { renderWithProviders } from "../../../../test-utils/render/render-with-providers";
import type { AlbumDTO } from "../../../album/infrastructure/album.dto";
import type { TodoDTO } from "../../../todos/infrastructure/todo.dto";
import type { UserDTO } from "../../../user/infrastructure/user.dto";
import { UserDetailPage } from "./user-detail-page";

describe("UserDetailPage", () => {
  const userId = "1";
  let user: UserDTO;
  let albums: AlbumDTO[];
  let todos: TodoDTO[];

  beforeEach(() => {
    const { response } = givenUser(userId);
    user = response;
    const { response: albumsResponse } = givenAlbums(userId);
    albums = albumsResponse;
    givenPhotos();
    const { response: todosResponse } = givenTodos(userId);
    todos = todosResponse;
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

    await waitFor(() => expect(screen.getAllByRole("list").length).toBe(2));

    const [albumList, todoList] = screen.getAllByRole("list");

    for (const album of albums) {
      const albumTitle = await within(albumList).findByText(album.title);
      expect(albumTitle).toBeInTheDocument();
    }

    for (const todo of todos) {
      const todoTitle = await within(todoList).findByText(todo.title);
      expect(todoTitle).toBeInTheDocument();
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
