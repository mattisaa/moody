import queryString from "query-string";
import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../colors";
import { Loader } from "../components/Loader";
import Text from "../components/Text";
import { AudioFeaturesEntity, RecentlyPlayedEntity } from "../types/types";
import { getMood, getTrackIdsFromRecentlyPlayedResponse } from "../utils/utils";
import { VisualizeSongs } from "./VisualizeSongs";

const Container = styled.div`
  background-color: ${colors.primaryBackground};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CenterAll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  object-fit: contain;
`;

export default function Moody(): ReactElement {
  const location = useLocation();

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
  if (recentlyPlayedError || tracksFeaturesError) {
    return <Text>Something went wrong</Text>;
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

  const moodScore = getMood(tracksFeatures);

  return (
    <Container>
      <VisualizeSongs tracks={recentPlayedTracks.items} />
    </Container>
  );
}
