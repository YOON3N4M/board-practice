import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

export const StyledFlexRowBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const StyledFlexColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const style = css`
  @font-face {
    font-family: "S-CoreDream-3Light";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-family: "S-CoreDream-3Light";
    // background-color: #000000;
    //margin: 0;
  }

  * {
    font-family: "S-CoreDream-3Light";
  }

  body {
    width: 100%;
    margin: 0 0;
    background-color: rgb(235, 238, 241);
  }

  a {
    text-decoration: none;
    color: black;
  }

  //스크롤바 스타일링
  *::-webkit-scrollbar {
    width: 5px;
    background-color: #ffffff;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #b4b4b4;
    border-radius: 10px;
  }
  .horizontal-scroll {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
  .horizontal-scroll::-webkit-scrollbar {
    height: 5px;
    background-color: #ffffff;
  }
  .horizontal-scroll::-webkit-scrollbar-thumb {
    background-color: #b4b4b4;
    border-radius: 10px;
  }
`;

export default function GlobalStyles() {
  return <Global styles={style} />;
}
