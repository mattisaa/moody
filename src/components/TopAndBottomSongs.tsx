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

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SongConatiner = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 20px 20px 0px;
`;

interface SongProps {
  src?: string;
  title?: string;
  artist?: string;
  label: string;
}

const SongInformation = ({ src, title, artist, label }: SongProps) => {
  return (
    <Container>
      <Text bold text={label} />
      <SongConatiner>
        <Image src={src} />
        <Container style={{ marginLeft: 20 }}>
          <Text bold>{title}</Text>
          <Text>{`by ${artist}`}</Text>
        </Container>
      </SongConatiner>
    </Container>
  );
};

function TopAndBottomSongs({ recentlyPlayed, audioFeatures }: Props) {
  const { happiestSongFeatures, saddestSongFeatures } = getHighsAndLows({
    recentlyPlayed,
    audioFeatures
  });

  return (
    <Container style={{ marginTop: 20 }}>
      <SongInformation
        src={happiestSongFeatures?.track.album.images[1].url}
        title={happiestSongFeatures?.track.name}
        artist={happiestSongFeatures?.track.artists[0].name}
        label="Happiest song"
      />
      <SongInformation
        src={saddestSongFeatures?.track.album.images[1].url}
        title={saddestSongFeatures?.track.name}
        artist={saddestSongFeatures?.track.artists[0].name}
        label="Saddest song"
      />
    </Container>
  );
}

export default TopAndBottomSongs;
