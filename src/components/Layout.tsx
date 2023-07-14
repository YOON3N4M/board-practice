import styled from "styled-components";
import Navigator from "./Navigator";
import { GlobalStyles } from "@/styles/GlobalStyles";

const AppContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  justify-content: center;
`;

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Navigator />
        {children}
      </AppContainer>
    </>
  );
}
