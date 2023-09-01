import { ChangeEvent, useState } from "react";
import { AuthForm, AuthFormWrapper, FormBox } from "./register";
import GoogleLogin from "@/components/login/GoogleLogin";
import { VStack } from "@chakra-ui/react";

export default function Register() {
  const [userAccount, setUserAccount] = useState("");
  const [userPassword, setUserPassword] = useState("");

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "account":
        setUserAccount(value);
        break;
      case "password":
        setUserPassword(value);
        break;
    }
  }
  return (
    <AuthFormWrapper>
      <FormBox>
        <AuthForm>
          <form>
            <h2>로그인 하기</h2>
            <label>아이디</label>
            <input
              name="account"
              value={userAccount}
              onChange={onInputChange}
              disabled
              required
              placeholder="현재 구글 로그인만 지원합니다."
            />
            <label>비밀번호</label>
            <input
              name="password"
              value={userPassword}
              onChange={onInputChange}
              type="password"
              disabled
              required
            />
            <button className="disabled-button" type="submit" disabled>
              로그인
            </button>
          </form>
          <VStack mt="5px">
            <GoogleLogin />
          </VStack>
        </AuthForm>
      </FormBox>
    </AuthFormWrapper>
  );
}
