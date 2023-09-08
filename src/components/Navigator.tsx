import Link from "next/link";
import styled from "@emotion/styled";
import { Button, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "@/util/StateContext";

const NavigatorContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.678);
  padding: 1rem 30%;
  box-sizing: border-box;
  justify-content: space-between;
  z-index: 900;
  border-bottom: 1px solid #e2e8f0;
  backdrop-filter: blur(10px);
  // border-bottom: 1px solid #6b6b6ba6;
  color: black;
`;

export default function Navigator() {
  const session: any = useSession();
  const router = useRouter();

  const { isLogin, sessionUser } = useContext(GlobalContext);

  return (
    <>
      {router.pathname.includes("map") ? null : (
        <NavigatorContainer className="navi">
          <Center>
            <Link legacyBehavior href="/">
              <a>헨젤</a>
            </Link>
          </Center>
          <Flex justifyContent={"space-between"} w="30%">
            {isLogin === "authenticated" && (
              <>
                {" "}
                <Link legacyBehavior href="/group">
                  <a>그룹</a>
                </Link>
              </>
            )}
          </Flex>
          {isLogin === "authenticated" ? (
            <>
              {" "}
              <HStack>
                <Text color={"black"}>
                  {sessionUser.nickname !== null && sessionUser.nickname} 님
                </Text>
                <button
                  className="logout"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  로그아웃
                </button>{" "}
              </HStack>
            </>
          ) : (
            <Center color="white">
              <Button
                size={"sm"}
                onClick={() => {
                  router.push("/login");
                }}
              >
                시작하기
              </Button>
            </Center>
          )}
        </NavigatorContainer>
      )}
    </>
  );
}
