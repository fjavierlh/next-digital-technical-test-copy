import React from "react";
import type { Album } from "../../domain/album.model";

type Props = {
  albums?: Album[];
  loading?: boolean;
  error?: Error | null;
};
export const AlbumsList: React.FC<Props> = ({ albums, loading, error }) => {
  if (loading) {
    return <div>Loading albums...</div>;
  }

  if (error) {
    console.error("Error loading albums:", error);
    return <div>Error loading albums: {error.message}</div>;
  }

  if (!albums || albums.length === 0) {
    return <div>No albums found.</div>;
  }

  return (
    <div>
      <p>Albums:</p>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title}
            {album?.photos?.[0] ? (
              <img
                src={album.photos[0].thumbnailUrl}
                alt={album.photos[0].title}
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};
