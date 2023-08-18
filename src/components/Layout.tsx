import Navigator from "./Navigator";
import { StateContext } from "@/util/StateContext";
import { useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import GlobalStyles from "@/styles/GlobalStyles";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  box-sizing: border-box;
`;

export default function Layout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const isMapPage = router.asPath === "/map";
  console.log(isMapPage);
  return (
    <>
      <AuthContext>
        <GlobalStyles />
        <Navigator />
        <AppContainer>{children}</AppContainer>
      </AuthContext>
    </>
  );
}
