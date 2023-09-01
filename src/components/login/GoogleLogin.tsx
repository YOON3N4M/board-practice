import { Button } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";

import styled from "@emotion/styled";

import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { GroupContext } from "@/util/StateContext";

export default function GoogleLogin() {
  const { data: session } = useSession();
  const context = useContext(GroupContext);
  const { inviteURL } = context;
  const [callBackURL, setCallBackURL] = useState<any>();

  useEffect(() => {
    if (inviteURL !== undefined) {
      setCallBackURL(`http://localhost:3000/invite/${inviteURL}`);
    } else {
      setCallBackURL(window.location.origin);
    }
  }, []);

  if (!session) {
    return (
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: `${callBackURL}`,
          })
        }
        leftIcon={<FcGoogle />}
        bgColor={"blue.800"}
        cursor="pointer"
        color="white"
      >
        구글 로그인 or 회원가입
      </Button>
    );
  }
}
