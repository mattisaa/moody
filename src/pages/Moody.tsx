import React, { ReactElement } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../colors";
import Text, { TextTypes } from "../components/Text";
import queryString from "query-string";
import { useQuery } from "react-query";

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
  console.log(access_token);

  const { isLoading, error, data } = useQuery("recentPlayed", () => {
    fetch("https://api.spotify.com/v1/me/player/recently-played/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(res => res.json());
  });

  if (error) {
    console.log(error);
  }

  console.log(data);

  return (
    <Container>
      <Text>Test</Text>
    </Container>
  );
}
