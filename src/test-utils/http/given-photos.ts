import { mockWebServer } from "../../../config/setupTests";
import type { PhotoDTO } from "../../core/album/infrastructure/photo.dto";
import { photoDTOsMock } from "../../core/album/infrastructure/photo.dto.mock";
import type { MockHandlerResolver } from "./mock-web-server";

// Response for https://jsonplaceholder.typicode.com/photos?albumId=:albumId
export function givenPhotos() {
  const handler: MockHandlerResolver<PhotoDTO[]> = {
    method: "get",
    endpoint: "https://jsonplaceholder.typicode.com/photos",
    httpStatusCode: 200,
    response: ({ request }) => {
      const url = new URL(request.url);
      const queryAlbumId = url.searchParams.get("albumId");
      return photoDTOsMock.filter(
        (photo) => photo.albumId === Number(queryAlbumId)
      );
    },
  };
  mockWebServer.addRequestHandlers([handler]);

  return handler;
}
