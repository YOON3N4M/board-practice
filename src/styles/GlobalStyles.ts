import { createGlobalStyle, styled } from "styled-components";

export const StyledFlexRowBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const StyledFlexColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GlobalStyles = createGlobalStyle`

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
body{
  margin: 0 0
}
a{
  text-decoration: none;
  color: white
}


`;
