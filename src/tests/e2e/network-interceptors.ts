import type { Page } from "@playwright/test";
import type { AlbumDTO } from "../../core/album/infrastructure/album.dto";
import type { PhotoDTO } from "../../core/album/infrastructure/photo.dto";
import type { UserDTO } from "../../core/user/infrastructure/user.dto";

export const interceptAlbumsNetworkRequest = (
  page: Page,
  userId: number
): Promise<AlbumDTO[]> =>
  createInterceptorNetwork<AlbumDTO[]>(
    `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
    200
  )(page);

export const interceptUsersNetworkRequest = (page: Page): Promise<UserDTO[]> =>
  createInterceptorNetwork<UserDTO[]>(
    "https://jsonplaceholder.typicode.com/users",
    200
  )(page);

export const interceptPhotosNetworkRequest = (
  page: Page,
  albumId: number
): Promise<PhotoDTO[]> =>
  createInterceptorNetwork<PhotoDTO[]>(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
    200
  )(page);

export const interceptUserNetworkRequest = (
  page: Page,
  userId: number
): Promise<UserDTO> =>
  createInterceptorNetwork<UserDTO>(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    200
  )(page);

export const interceptTodosNetworkRequest = (
  page: Page,
  userId: number
): Promise<PhotoDTO[]> =>
  createInterceptorNetwork<PhotoDTO[]>(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
    200
  )(page);

function createInterceptorNetwork<T>(
  url: string,
  status: number,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
): (page: Page) => Promise<T> {
  return async (page: Page): Promise<T> => {
    const response = await page.waitForResponse(
      (res) =>
        res.url().includes(url) &&
        res.status() === status &&
        res.request().method() === method
    );
    const data: T = await response.json();
    return data;
  };
}
