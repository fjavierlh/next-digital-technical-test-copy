import React from "react";
import type { Album } from "../../domain/album.model";

type Props = {
  album: Album;
};

export const AlbumDetail: React.FC<Props> = ({ album }) => {
  return (
    <div>
      {album.title}
      {album.photos && album.photos.length > 0 ? (
        <div>
          <h3>Photos:</h3>
          <ul>
            {album.photos.map((photo) => (
              <li key={photo.id}>
                <p>{photo.title}</p>
                <img src={photo.url} alt={photo.title} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No photos available.</p>
      )}
    </div>
  );
};
