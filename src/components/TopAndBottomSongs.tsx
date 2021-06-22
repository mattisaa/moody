import React from "react";
import styled from "styled-components";
import { AudioFeatures, ItemsEntity } from "../types/types";
import Text from "./Text";
import { getHighsAndLows } from "../utils/utils";

interface Props {
  recentlyPlayed: ItemsEntity[];
  audioFeatures: AudioFeatures[];
}

const Image = styled.img`
  object-fit: contain;
  max-width: 100px;
  max-height: 100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

interface SongProps {
  src?: string;
  title?: string;
}

const SongInformation = ({ src, title }: SongProps) => {
  return (
    <ImageContainer>
      <Image src={src} />
      <Text bold>{title}</Text>
    </ImageContainer>
  );
};

function TopAndBottomSongs({ recentlyPlayed, audioFeatures }: Props) {
  const { happiestSongFeatures, saddestSongFeatures } = getHighsAndLows({
    recentlyPlayed,
    audioFeatures
  });

  return (
    <Container>
      <SongInformation
        src={happiestSongFeatures?.track.album.images[1].url}
        title={happiestSongFeatures?.track.name}
      />
      <SongInformation
        src={saddestSongFeatures?.track.album.images[1].url}
        title={saddestSongFeatures?.track.name}
      />
    </Container>
  );
}

export default TopAndBottomSongs;
