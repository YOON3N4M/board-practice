import Link from "next/link";
import styled from "@emotion/styled";
import { Center, Flex, HStack, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if (session.data == undefined || null) {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  }, [session.data]);

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
            {isSignIn && (
              <>
                {" "}
                <Link legacyBehavior href="/group">
                  <a>그룹</a>
                </Link>
              </>
            )}
          </Flex>
          {isSignIn ? (
            <>
              {" "}
              <HStack>
                <Text color={"black"}>
                  {session.data?.user.nickname !== null &&
                    session.data?.user.nickname}{" "}
                  님
                </Text>
                <button className="logout" onClick={() => signOut()}>
                  로그아웃
                </button>{" "}
              </HStack>
            </>
          ) : (
            <Center color="white">
              <Link legacyBehavior href="/login">
                <a>로그인</a>
              </Link>
            </Center>
          )}
        </NavigatorContainer>
      )}
    </>
  );
}
