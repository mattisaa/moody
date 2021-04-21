import React, { ReactElement } from "react";
import styled from "styled-components";
import { AudioFeatures, ItemsEntity } from "../types/types";
import { getHighsAndLows } from "../utils/utils";
import Text from "../components/Text";

interface Props {
  recentlyPlayed: ItemsEntity[];
  audioFeatures: AudioFeatures[];
}

const Image = styled.img`
  object-fit: contain;
`;

const Container = styled.div`
  display: flex;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 150px;
`;

function Results({ recentlyPlayed, audioFeatures }: Props): ReactElement {
  const { happiestSongFeatures, saddestSongFeatures } = getHighsAndLows({
    recentlyPlayed,
    audioFeatures
  });

  return (
    <Container>
      <ImageContainer style={{ margin: 20 }}>
        <Image src={happiestSongFeatures?.track.album.images[1].url} />
        <Text style={{ textAlign: "center" }} bold>
          {happiestSongFeatures?.track.name}
        </Text>
      </ImageContainer>
      <ImageContainer>
        <Image src={saddestSongFeatures?.track.album.images[1].url} />
        <Text style={{ textAlign: "center" }} bold>
          {saddestSongFeatures?.track.name}
        </Text>
      </ImageContainer>
    </Container>
  );
}

export default Results;
