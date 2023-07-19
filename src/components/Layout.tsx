import styled from "styled-components";
import Navigator from "./Navigator";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { StateContext } from "@/util/StateContext";

const AppContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  justify-content: center;
`;

export default function Layout({ children }: React.PropsWithChildren) {
  const test = "test";
  return (
    <>
      <StateContext.Provider value={{ test }}>
        <GlobalStyles />
        <AppContainer>
          <Navigator />
          {children}
        </AppContainer>
      </StateContext.Provider>
    </>
  );
}
