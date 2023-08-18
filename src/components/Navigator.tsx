import Link from "next/link";
import styled from "@emotion/styled";
import { Center, Flex, HStack } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const NavigatorContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: rgb(177, 177, 177);
  padding: 1rem 30%;
  box-sizing: border-box;
  justify-content: space-between;
  // border-bottom: 1px solid #6b6b6ba6;
`;

export default function Navigator() {
  const session = useSession();
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
              <Link legacyBehavior href="/map">
                <a>맵</a>
              </Link>
            </>
          )}
        </Flex>
        {isSignIn ? (
          <>
            <button onClick={() => signOut()}>로그아웃</button>
          </>
        ) : (
          <Center color="white">
            <Link legacyBehavior href="/login">
              <a>로그인</a>
            </Link>
          </Center>
        )}
      </NavigatorContainer>
    </>
  );
}
