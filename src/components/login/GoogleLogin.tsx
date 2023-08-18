import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: `${window.location.origin}`,
          })
        }
        leftIcon={<FcGoogle />}
        bgColor="#34495e"
        cursor="pointer"
        color="white"
      >
        구글 로그인 or 회원가입
      </Button>
    );
  }
}
