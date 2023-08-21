import Navigator from "./Navigator";
import { StateContext } from "@/util/StateContext";
import { useState } from "react";
import { useRouter } from "next/router";

import GlobalStyles from "@/styles/GlobalStyles";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";

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
  const session: any = useSession();

  console.log(session.data?.user.nickname);

  useEffec;
  return (
    <>
      <GlobalStyles />
      <Navigator />
      <AppContainer>{children}</AppContainer>
    </>
  );
}
