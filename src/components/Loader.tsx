import styled from "styled-components";
import { colors } from "../colors";

export const Loader = styled.div`
  width: 8px;
  height: 40px;
  border-radius: 4px;
  display: inline-block;
  margin-left: 20px;
  margin-top: 10px;
  position: relative;
  background: currentColor;
  color: ${colors.black};
  box-sizing: border-box;
  animation: animloader 0.3s 0.3s linear infinite alternate;
  :after,
  :before {
    content: "";
    box-sizing: border-box;
    width: 8px;
    height: 40px;
    border-radius: 4px;
    background: currentColor;
    position: absolute;
    bottom: 0;
    left: 20px;
    animation: animloader1 0.3s 0.45s linear infinite alternate;
  }
  :before {
    left: -20px;
    animation-delay: 0s;
  }

  @keyframes animloader {
    0% {
      height: 40px;
      transform: translateY(0);
    }
    100% {
      height: 10px;
      transform: translateY(30px);
    }
  }

  @keyframes animloader1 {
    0% {
      height: 48px;
    }
    100% {
      height: 4.8px;
    }
  }
`;
