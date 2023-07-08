import styled from "styled-components";
import Navigator from "./Navigator";

const AppContainer = styled.div`
  max-width: 100vw;
`;

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <AppContainer>
        <Navigator />
        {children}
      </AppContainer>
    </>
  );
}
