import { mockWebServer } from "../../../config/setupTests";
import type { AlbumDTO } from "../../core/album/infrastructure/album.dto";
import { albumDTOsMock } from "../../core/album/infrastructure/album.dto.mock";
import type { MockHandler } from "./mock-web-server";

// Response for https://jsonplaceholder.typicode.com/users/:userId/albums
export function givenAlbums(id: string) {
  const handler: MockHandler<AlbumDTO[]> = {
    method: "get",
    endpoint: `https://jsonplaceholder.typicode.com/users/${id}/albums`,
    httpStatusCode: 200,
    response: albumDTOsMock.filter((album) => album.userId === Number(id)),
  };
  mockWebServer.addRequestHandlers([handler]);

  return handler;
}
