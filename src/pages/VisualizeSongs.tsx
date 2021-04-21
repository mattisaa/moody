import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { ItemsEntity } from "../types/types";
import Text, { TextTypes } from "../components/Text";
import { useStore } from "../store";
import { colors } from "../colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  object-fit: contain;
`;

const Bar = styled.div<{ progress: number }>`
  background: linear-gradient(
    to right,
    ${colors.black} 0% ${props => props.progress}%,
    ${colors.primarySpotifyBackground} ${props => props.progress}%
  );
  height: 9px;
  border-radius: 14px;
  margin-top: 10px;
`;

export function VisualizeSongs({
  tracks
}: {
  tracks: ItemsEntity[];
}): ReactElement {
  const [currentSongUri, setCurrentSongUri] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const isVisualizingFinished = useStore(
    state => state.isVisualizationFinished
  );
  const setIsVisualizingFinished = useStore(
    state => state.setIsVisualizationFinished
  );

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
          <Bar progress={currentIndex * 5} />
        </div>
      )}
    </Container>
  );
}
