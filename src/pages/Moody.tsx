import queryString from "query-string";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../colors";
import { CenterAll } from "../components/CommonUI";
import FadeIn from "../components/FadeIn";
import { Loader } from "../components/Loader";
import Text from "../components/Text";
import { useStore } from "../store";
import { AudioFeaturesEntity, RecentlyPlayedEntity } from "../types/types";
import { getMood, getTrackIdsFromRecentlyPlayedResponse } from "../utils/utils";
import Results from "./Results";
import { VisualizeSongs } from "./VisualizeSongs";

const Container = styled.div`
  background-color: ${colors.primaryBackground};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Moody(): ReactElement {
  const location = useLocation();

  const isVisualizingFinished = useStore(
    state => state.isVisualizationFinished
  );
  const setMoodScore = useStore(state => state.setMoodScore);

  const params = queryString.parse(location.hash);

  const access_token = params["access_token"];

  const {
    isLoading: isRecentlyPlayedLoading,
    error: recentlyPlayedError,
    data: recentPlayedTracks
  } = useQuery<RecentlyPlayedEntity>("recentPlayed", () => {
    return fetch("https://api.spotify.com/v1/me/player/recently-played/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(res => res.json());
  });

  let ids: string[] | undefined = undefined;
  if (recentPlayedTracks) {
    ids = getTrackIdsFromRecentlyPlayedResponse(recentPlayedTracks);
  }
  const {
    error: tracksFeaturesError,
    data: tracksFeatures,
    isLoading: isTracksFeaturesLoading
  } = useQuery<AudioFeaturesEntity>(
    "tracks",
    () => {
      return fetch(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }).then(res => res.json());
    },
    { enabled: !!ids }
  );

  React.useEffect(() => {
    if (tracksFeatures) {
      const moodScore = getMood(tracksFeatures);
      setMoodScore(moodScore);
    }
  }, [tracksFeatures]);

  if (recentlyPlayedError || tracksFeaturesError) {
    return (
      <CenterAll>
        <Text>Something went wrong</Text>
      </CenterAll>
    );
  }

  if (
    isTracksFeaturesLoading ||
    isRecentlyPlayedLoading ||
    !tracksFeatures ||
    !recentPlayedTracks
  ) {
    return (
      <CenterAll>
        <Loader />
      </CenterAll>
    );
  }

  return (
    <Container>
      <VisualizeSongs tracks={recentPlayedTracks.items} />
      {isVisualizingFinished ? (
        <FadeIn>
          <Results
            recentlyPlayed={recentPlayedTracks.items}
            audioFeatures={tracksFeatures.audio_features}
          />
        </FadeIn>
      ) : null}
    </Container>
  );
}
