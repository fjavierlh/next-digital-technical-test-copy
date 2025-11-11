import type { PhotoId } from "./photo-id.vo";

export type Photo = {
  id: PhotoId;
  title: string;
  url: string;
  thumbnailUrl: string;
};
