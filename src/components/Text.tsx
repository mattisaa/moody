import styled, { css } from "styled-components";
import { fonts } from "../assets/fonts/fonts";

export const sharedTextStyle = css`
  ${fonts.regular};
  margin: 0px;
`;

const TextContainer = styled.p`
  ${sharedTextStyle}
`;

interface Props {
  text: string;
}

export default function Text({ text }: Props) {
  return <TextContainer>{text}</TextContainer>;
}
