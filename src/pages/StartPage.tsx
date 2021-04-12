import React, { ReactElement } from "react";
import styled from "styled-components";
import Spotify from "../assets/fonts/svg/spotify";
import { colors } from "../colors";
import { PrimaryButton } from "../components/Buttons";
import Text, { TextTypes } from "../components/Text";
import { urls } from "../resources/urls";

const Container = styled.div`
  background-color: ${colors.primaryBackground};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const scope = "user-read-private user-read-recently-played";
const encodedScopes = encodeURIComponent(scope);

export default function StartPage(): ReactElement {
  function handlePress() {
    window.location.href = `${urls.spotifyAuth}?client_id=${
      process.env.REACT_APP_CLIENT_ID
    }&scope=${encodedScopes}&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/moody"
    )}&response_type=token&show_dialog=true`;
  }

  return (
    <Container>
      <Text
        text="moody"
        type={TextTypes.xlarge}
        bold
        style={{ marginBottom: 40 }}
      />
      <Text
        text="find out your moody mood based on your recent played songs on spotify"
        type={TextTypes.normal}
        bold
        style={{ marginBottom: 40, textAlign: "center" }}
      />
      <PrimaryButton onClick={handlePress}>
        <div style={{ display: "flex" }}>
          <Spotify />
          <Text
            text="Connect with Spotify"
            type={TextTypes.normal}
            bold
            style={{ marginLeft: 10 }}
          />
        </div>
      </PrimaryButton>
    </Container>
  );
}