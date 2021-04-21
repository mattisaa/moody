import styled, { keyframes } from "styled-components";
import React, { ReactElement, PropsWithChildren } from "react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
  }
`;

interface Props {
  duration?: number;
  delay?: number;
}

export default function FadeIn({
  duration = 3000,
  delay = 0,
  children
}: PropsWithChildren<Props>): ReactElement {
  return (
    <Wrapper
      style={{
        animationDuration: duration + "ms",
        animationDelay: delay + "ms"
      }}
    >
      {children}
    </Wrapper>
  );
}
