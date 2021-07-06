import React from "react";
import styled from "styled-components";
import { colors } from "../colors";
import Text, { TextTypes } from "../components/Text";
import { useStore } from "../store";
import { getMoodEmoji } from "../utils/utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px ${colors.black};
  border-style: solid;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.black};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 20px;
`;

const ColoredText = styled(Text)`
  color: ${colors.white};
  text-align: center;
`;

function ResultBox() {
  const moodScore = useStore(state => state.moodScore);

  const emoji = getMoodEmoji(moodScore.mood);
  return (
    <ScoreContainer>
      <RowContainer>
        <Container>
          <ColoredText type={TextTypes.xlarge} bold>
            Dancibility
          </ColoredText>
          <ColoredText type={TextTypes.xlarge} bold>
            {moodScore.danceability} %
          </ColoredText>
        </Container>
        <Container>
          <ColoredText type={TextTypes.xlarge} bold>
            Energy
          </ColoredText>
          <ColoredText type={TextTypes.xlarge} bold>
            {moodScore.energy} %
          </ColoredText>
        </Container>
      </RowContainer>
      <BottomContainer>
        <Text type={TextTypes.xlarge} style={{ textAlign: "center" }} bold>
          Mood
        </Text>
        <Text type={TextTypes.xxxlarge} style={{ textAlign: "center" }} bold>
          {moodScore.mood} % {emoji}
        </Text>
      </BottomContainer>
    </ScoreContainer>
  );
}

export default ResultBox;
