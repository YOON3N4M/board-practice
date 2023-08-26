import Navigator from "./Navigator";
import { GroupContext, StateContext } from "@/util/StateContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import GlobalStyles from "@/styles/GlobalStyles";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";

const AppContainer = styled.div<{ $isMapPage: boolean }>`
  margin: 0;
  padding-top: ${props => (props.$isMapPage ? "0px" : "80px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100%;
  box-sizing: border-box;
`;

export default function Layout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const isMapPage = router.asPath.includes("/map");
  const session: any = useSession();
  //그룹 데이터 관련 state 추후 리덕스로 빼야 할 수도....
  const [groupData, setGroupData] = useState({});

  //로그인 이후 닉네임 여부 확인 로직
  function checkIsExistNicknameDB() {
    if (session.data === undefined) return;
    //로그인 상태가 아니면 탈출
    if (session.status !== "authenticated") return;
    //로그인 설정 창이면 탈출
    if (router.pathname === "/nickname") return;

    if (session.data.user.nickname === null) {
      alert(
        "원활한 서비스 이용을 위해 가입 이후 최초 닉네임 설정이 필요합니다. 닉네임 설정 화면으로 이동합니다."
      );
      router.push("/nickname");
    }
  }

  useEffect(() => {
    checkIsExistNicknameDB();
  }, [session.data]);

  return (
    <>
      <GlobalStyles />
      <Navigator />
      <GroupContext.Provider value={{ groupData, setGroupData }}>
        <AppContainer $isMapPage={isMapPage}>{children}</AppContainer>
      </GroupContext.Provider>
    </>
  );
}
