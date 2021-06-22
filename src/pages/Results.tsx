import React, { ReactElement } from "react";
import styled from "styled-components";
import { AudioFeatures, ItemsEntity } from "../types/types";
import { getHighsAndLows, getMoodEmoji } from "../utils/utils";
import Text, { TextTypes } from "../components/Text";
import { useStore } from "../store";
import { Column } from "../components/CommonUI";
import { colors } from "../colors";

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

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px ${colors.black};
  border-style: solid;
  border-radius: 12px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

function Results({ recentlyPlayed, audioFeatures }: Props): ReactElement {
  const { happiestSongFeatures, saddestSongFeatures } = getHighsAndLows({
    recentlyPlayed,
    audioFeatures
  });

  const moodScore = useStore(state => state.moodScore);

  const emoji = getMoodEmoji(moodScore);

  return (
    <Column>
      <ScoreContainer>
        <RowContainer>
          <Container>
            <Text type={TextTypes.xlarge} style={{ textAlign: "center" }} bold>
              Dancibility
            </Text>
            <Text type={TextTypes.xlarge} style={{ textAlign: "center" }} bold>
              {moodScore} %
            </Text>
          </Container>
          <Container>
            <Text type={TextTypes.xlarge} style={{ textAlign: "center" }} bold>
              energy:
            </Text>
            <Text type={TextTypes.xlarge} style={{ textAlign: "center" }} bold>
              {moodScore} %
            </Text>
          </Container>
        </RowContainer>
        <Container>
          <Text type={TextTypes.xlarge} style={{ textAlign: "center" }} bold>
            Mood:
          </Text>
          <Text type={TextTypes.xxxlarge} style={{ textAlign: "center" }} bold>
            {moodScore} % {emoji}
          </Text>
        </Container>
      </ScoreContainer>

      <Container>
        <ImageContainer>
          <Image src={happiestSongFeatures?.track.album.images[1].url} />
          <Text bold>{happiestSongFeatures?.track.name}</Text>
        </ImageContainer>
        <ImageContainer>
          <Image src={saddestSongFeatures?.track.album.images[1].url} />
          <Text bold>{saddestSongFeatures?.track.name}</Text>
        </ImageContainer>
      </Container>
    </Column>
  );
}

export default Results;
