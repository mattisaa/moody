import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { ItemsEntity } from "../types/types";
import Text, { TextTypes } from "../components/Text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  object-fit: contain;
`;

export function VisualizeSongs({
  tracks
}: {
  tracks: ItemsEntity[];
}): ReactElement {
  const [currentSongUri, setCurrentSongUri] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisualizingFinished, setIsVisualizingFinished] = useState(false);

  useEffect(() => {
    tracks.forEach((item, index) =>
      setTimeout(() => {
        setCurrentSongUri(item.track.album.images[1].url);
        setCurrentIndex(index + 1);
      }, index * 150)
    );
  }, []);

  if (currentIndex === tracks.length && !isVisualizingFinished) {
    setTimeout(() => {
      setIsVisualizingFinished(true);
    }, 250);
  }

  return (
    <Container>
      {isVisualizingFinished ? null : (
        <div>
          <Image src={currentSongUri} />
          <Text
            type={TextTypes.xlarge}
            bold
            style={{ textAlign: "center", marginTop: 20 }}
          >
            {currentIndex}/{tracks.length}
          </Text>
        </div>
      )}
    </Container>
  );
}
