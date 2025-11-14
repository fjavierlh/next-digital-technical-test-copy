import { expect, test, type Page } from "@playwright/test";
import { transformPhotoUrl } from "../../core/album/infrastructure/utils/transform-photo-url";
import type { UserDTO } from "../../core/user/infrastructure/user.dto";
import {
  interceptAlbumsNetworkRequest,
  interceptPhotosNetworkRequest,
  interceptUserNetworkRequest,
  interceptUsersNetworkRequest,
} from "./network-interceptors";

test.describe("Application", () => {
  let users: UserDTO[];
  let user: UserDTO;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    users = await interceptUsersNetworkRequest(page);
    const userId = users[Math.floor(Math.random() * users.length)].id;
    user = users.find((u) => u.id === userId)!;
  });

  test("should load the base URL and display user names", async ({ page }) => {
    const list = page.getByRole("list");
    await expect(list).toBeVisible();
    const listItems = list.getByRole("listitem");
    await expect(listItems).toHaveCount(users.length);
    expect(listItems).toHaveText(users.map((user) => user.name));
  });

  test("should navigate to user detail page on user click", async ({
    page,
  }) => {
    const firstUserLink = page.getByText(user.name);

    await Promise.all([
      page.waitForURL(`/user/${user.id}`),
      firstUserLink.click(),
    ]);

    await expect(page.getByText(user.name)).toBeVisible();
  });

  test("should display albums for a user on user detail page", async ({
    page,
  }) => {
    const firstUserLink = page.getByText(user.name);

    const [[, albumsData]] = await Promise.all([
      interceptUserDetailsNetwork(page, user.id),
      page.waitForURL(`/user/${user.id}`),
      firstUserLink.click(),
    ]);

    await expect(page.getByRole("heading", { name: user.name })).toBeVisible();

    await expect(page.getByText("Albums:")).toBeVisible();
    const list = page.getByRole("list");
    await expect(list).toBeVisible();
    const listItems = list.getByRole("listitem");
    expect(listItems).toHaveCount(albumsData.length);

    const items = await listItems.all();
    for (const item of items) {
      const link = item.getByRole("link");
      await expect(link).toBeVisible();
      expect(link).toHaveAttribute(
        "href",
        `/user/${user.id}/album/${albumsData[items.indexOf(item)].id}`
      );

      const paragraph = item.getByText(albumsData[items.indexOf(item)].title);
      await expect(paragraph).toBeVisible();

      const img = item.getByRole("img");
      await expect(img).toBeVisible();
    }
  });

  test("should allow navigate to album detail page from user detail page", async ({
    page,
  }) => {
    const userLink = page.getByText(user.name);

    const [albums] = await Promise.all([
      interceptAlbumsNetworkRequest(page, user.id),
      page.waitForURL(`/user/${user.id}`),
      userLink.click(),
    ]);

    const album = albums[Math.floor(Math.random() * albums.length)];
    const firstAlbumLink = page.getByRole("link", { name: album.title });

    const [photos] = await Promise.all([
      interceptPhotosNetworkRequest(page, album.id),
      page.waitForURL(`/user/${user.id}/album/${album.id}`),
      firstAlbumLink.click(),
    ]);

    await expect(page.getByText("Photos:")).toBeVisible();
    const list = page.getByRole("list");
    expect(list).toBeVisible();
    const listItems = list.getByRole("listitem");
    expect(listItems).toHaveCount(photos.length);

    const items = await listItems.all();
    for (const item of items) {
      const img = item.getByRole("img");
      const itemIndex = items.indexOf(item);
      const photo = photos[itemIndex];
      await expect(img).toHaveAttribute("src", transformPhotoUrl(photo.url));
      expect(img).toHaveAttribute("alt", photo.title);
    }
  });
});

async function interceptUserDetailsNetwork(page: Page, userId: number) {
  return await Promise.all([
    interceptUserNetworkRequest(page, userId),
    interceptAlbumsNetworkRequest(page, userId),
  ]);
}
