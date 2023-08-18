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
    // background-color: #000000;
    //margin: 0;
    font-family: "S-CoreDream-3Light";
  }
  body {
    width: 100%;
    margin: 0 0;
    background-color: rgb(235, 238, 241);
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

export default function GlobalStyles() {
  return <Global styles={style} />;
}
