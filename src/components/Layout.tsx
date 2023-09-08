import { GlobalContext, StateContext } from "@/util/StateContext";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import GlobalStyles from "@/styles/GlobalStyles";
import styled from "@emotion/styled";
import { useSession } from "next-auth/react";
import Navigator from "./Navigator";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { routerPush } from "@/util/authUtils";
import { UserT } from "@/@types/types";

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
  const [inviteURL, setInviteURL] = useState();
  const [isModalOn, setIsModalOn] = useState(false);
  const [isLogin, setIsLogin] = useState("unauthenticated");
  const [sessionUser, setSessionUser] = useState<UserT>();

  //로그인 여부 체크 로직
  function checkSessionInfo() {
    if (session.status === "loading") {
      return;
    } else if (session.status === "unauthenticated") {
      if (router.pathname === "/login") return;
      alert("로그인이 필요한 서비스 입니다.");
    } else if (session.status === "authenticated") {
      setIsLogin("authenticated");
      setSessionUser(session.data.user);
    }
  }

  //로그인 이후 닉네임 여부 확인 로직
  function checkIsExistNicknameDB() {
    if (isLogin === "loading") return;
    //로그인 상태가 아니면 탈출
    if (isLogin === "unauthenticated") return;
    //로그인 설정 창이면 탈출
    if (router.pathname === "/profile/edit") return;

    if (session.data.user.nickname === null) {
      setIsModalOn(true);
    }
  }

  function handleModalClose() {
    setIsModalOn(false);
    routerPush(router, "/profile/edit");
  }

  useEffect(() => {
    checkIsExistNicknameDB();
  }, [isLogin]);

  useEffect(() => {
    checkSessionInfo();
  }, [session.data]);

  console.log(sessionUser);
  return (
    <>
      <GlobalStyles />

      <GlobalContext.Provider
        value={{
          groupData,
          setGroupData,
          inviteURL,
          setInviteURL,
          isLogin,
          setIsLogin,
          sessionUser,
          setSessionUser,
        }}
      >
        <Navigator />
        {isModalOn && (
          <Modal
            isOpen={isModalOn}
            onClose={() => setIsModalOn(false)}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>프로필</ModalHeader>
              <ModalBody>
                원활한 서비스 이용을 위해, 최초 1회 프로필 설정이 필요합니다.
              </ModalBody>
              <ModalFooter>
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    프로필 설정으로{" "}
                  </Text>
                  <Button
                    bgColor={"blue.800"}
                    color={"white"}
                    onClick={() => handleModalClose()}
                    ml={"10px"}
                  >
                    이동
                  </Button>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        <AppContainer $isMapPage={isMapPage}>{children}</AppContainer>
      </GlobalContext.Provider>
    </>
  );
}
