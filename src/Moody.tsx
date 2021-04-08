import React from "react";
import Text, { TextTypes } from "./components/Text";
import styled from "styled-components";
import { colors } from "./colors";
import { Button } from "react-bootstrap";

const Container = styled.div`
  background-color: ${colors.primaryBackground};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Moody() {
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
      <Button
        style={{
          backgroundColor: colors.primarySpotifyBackground,
          border: "none",
          color: colors.black,
          padding: 20,
          borderRadius: 12
        }}
      >
        <Text text="Connect with Spotify" type={TextTypes.normal} bold />
      </Button>
    </Container>
  );
}
