import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { ItemsEntity } from "../types/types";

const Image = styled.img`
  object-fit: contain;
`;

export function VisualizeSongs({
  tracks
}: {
  tracks: ItemsEntity[];
}): ReactElement {
  const [currentSongUri, setCurrentSongUri] = useState<string>();
  useEffect(() => {
    tracks.forEach((item, index) =>
      setTimeout(
        () => setCurrentSongUri(item.track.album.images[1].url),
        index * 150
      )
    );
  }, []);

  return (
    <div>
      <Image src={currentSongUri} />
    </div>
  );
}
