import styled from "styled-components";
import { colors } from "../colors";

export const CleanButton = styled.button`
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
export const PrimaryButton = styled.button`
  padding: 0px;
  background: none;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${colors.primarySpotifyBackground};
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
