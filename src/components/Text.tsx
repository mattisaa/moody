import { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import { fonts } from "../assets/fonts/fonts";

export enum TextTypes {
  small,
  normal,
  large,
  xlarge,
  xxxlarge
}

export const sharedTextStyle = css`
  ${fonts.regular};
  margin: 0px;
`;

const textTypes = {
  [TextTypes.small]: styled.p`
    ${sharedTextStyle};
    font-size: 12px;
  `,
  [TextTypes.normal]: styled.p`
    ${sharedTextStyle};
    font-size: 14px;
  `,
  [TextTypes.large]: styled.p`
    ${sharedTextStyle};
    font-size: 16px;
  `,
  [TextTypes.xlarge]: styled.p`
    ${sharedTextStyle};
    font-size: 20px;
  `,
  [TextTypes.xxxlarge]: styled.p`
    ${sharedTextStyle};
    font-size: 50px;
  `
};

interface Props {
  text?: string;
  bold?: boolean;
  type?: TextTypes;
  style?: React.CSSProperties;
  className?: string;
}

export default function Text({
  text,
  bold,
  type,
  style,
  children,
  className
}: PropsWithChildren<Props>) {
  const TextStyle = textTypes[type || TextTypes.normal];
  return (
    <TextStyle
      style={{ fontWeight: bold ? 700 : undefined, ...style }}
      className={className}
    >
      {text}
      {children}
    </TextStyle>
  );
}
