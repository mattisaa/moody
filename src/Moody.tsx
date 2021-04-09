import React from "react";
import styled, { css } from "styled-components";
import { colors } from "./colors";
import { PrimaryButton } from "./components/Buttons";
import Text, { TextTypes } from "./components/Text";
import { urls } from "./resources/urls";

const Container = styled.div`
  background-color: ${colors.primaryBackground};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const buttonStyle = css`
  padding: 0px;
  background: none;
  box-sizing: border-box;
  border: none;
  &:active {
    opacity: 0.5;
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    opacity: 1;
  }
`;
const scope = "user-read-private user-read-currently-playing";
const encodedScopes = encodeURIComponent(scope);

export default function Moody() {
  function handlePress() {
    window.location.href = `${urls.spotifyAuth}?client_id=${
      process.env.REACT_APP_CLIENT_ID
    }&scope=${encodedScopes}&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/"
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
        <Text text="Connect with Spotify" type={TextTypes.normal} bold />
      </PrimaryButton>
    </Container>
  );
}
