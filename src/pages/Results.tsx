import React, { ReactElement } from "react";
import styled from "styled-components";
import { AudioFeatures, ItemsEntity } from "../types/types";
import { getHighsAndLows, getMoodEmoji } from "../utils/utils";
import Text, { TextTypes } from "../components/Text";
import { useStore } from "../store";
import { Column } from "../components/CommonUI";
import { colors } from "../colors";
import ResultBox from "../components/ResultBox";
import TopAndBottomSongs from "../components/TopAndBottomSongs";

interface Props {
  recentlyPlayed: ItemsEntity[];
  audioFeatures: AudioFeatures[];
}

function Results({ recentlyPlayed, audioFeatures }: Props): ReactElement {
  return (
    <Column>
      <Text
        text="Results"
        type={TextTypes.xxxlarge}
        style={{ textAlign: "center", marginBottom: 20 }}
      />
      <ResultBox />
      <TopAndBottomSongs
        recentlyPlayed={recentlyPlayed}
        audioFeatures={audioFeatures}
      />
    </Column>
  );
}

export default Results;
