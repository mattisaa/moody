import queryString from "query-string";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../colors";
import Text from "../components/Text";
import { getMood, getTrackIdsFromRecentlyPlayedResponse } from "../utils/utils";

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

  const params = queryString.parse(location.hash);

  const access_token = params["access_token"];

  const {
    isLoading,
    error: recentlyPlayedError,
    data: recentPlayedTracks
  } = useQuery("recentPlayed", () => {
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
  const { error: tracksFeaturesError, data: tracksFeatures } = useQuery(
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
  if (recentlyPlayedError || tracksFeaturesError || !tracksFeatures) {
    return <Text>Something went wrong</Text>;
  }

  const moodScore = getMood(tracksFeatures);

  return (
    <Container>
      <Text>Test</Text>
    </Container>
  );
}
