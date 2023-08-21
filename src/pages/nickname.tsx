import { useState, useEffect } from "react";
import { AuthForm, AuthFormWrapper, FormBox } from "./register";
import { useSession } from "next-auth/react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Nickname() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [nickname, setNickname] = useState("");

  function handleInputChange(e: any) {
    setNickname(e.target.value);
  }

  function isLoggedin() {
    if (session === undefined) return;
    if (status !== "authenticated") {
      alert("로그인이 필요한 서비스 입니다.");
      router.push("/login");
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
  }

  async function handleChangeNickname() {
    if (session === undefined || session === null) return;
    //issue 세션 업데이트를 구현 못하겠음... 바로 아래 로직 활용하는 거 같은데,,,
    // const a = await update();
  }

  useEffect(() => {
    isLoggedin();
  }, [session]);

  console.log(session);
  return (
    <>
      {status === "authenticated" && (
        <AuthFormWrapper>
          <FormBox>
            <AuthForm>
              <form onSubmit={handleSubmit}>
                <Heading fontSize={"2xl"} mb={"30px"}>
                  새로운 닉네임
                </Heading>
                <Text fontSize={"sm"}>
                  정상적인 서비스 이용을 위해선 닉네임을 설정해야 합니다.
                </Text>
                <Text mb="15px" fontSize="11px" color={"gray"}>
                  서비스 이용 중 다른 사용자에게 노출되는 별명입니다.
                </Text>
                <label>사용할 닉네임 입력</label>
                <input
                  value={nickname}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={8}
                  placeholder="2글자~8글자 글자수 제한이 있습니다."
                ></input>
                <Button bgColor={"blue.800"} color={"white"}>
                  입력
                </Button>
                <button type="button" onClick={handleChangeNickname}>
                  테스트
                </button>
              </form>
            </AuthForm>
          </FormBox>
        </AuthFormWrapper>
      )}
    </>
  );
}
