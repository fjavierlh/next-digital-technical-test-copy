import { AlbumId } from "./album-id.vo";
import type { Photo } from "./photo.model";

export type Album = {
  id: AlbumId;
  title: string;
  photos?: Photo[];
};
