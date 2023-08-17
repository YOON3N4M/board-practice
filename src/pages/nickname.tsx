import { useState } from "react";
import { AuthForm, AuthFormWrapper, FormBox } from "./register";
import { useSession } from "next-auth/react";

export default function Nickname() {
  const session = useSession();
  console.log(session.data);
  const [nickname, setNickname] = useState("");

  function handleInputChange(e: any) {
    setNickname(e.target.value);
  }

  async function handleSubmit(e: any) {}
  return (
    <>
      <AuthFormWrapper>
        <FormBox>
          <AuthForm>
            <h2>새로운 닉네임</h2>
            <h4>사용할 닉네임을 입력해주세요!</h4>
            <small>서비스 이용 중 다른 사용자에게 노출되는 별명입니다.</small>
            <small>닉네임은 글자수 제한(2~8)이 있습니다.</small>
            <input
              value={nickname}
              onChange={handleInputChange}
              minLength={2}
              maxLength={8}
            ></input>
          </AuthForm>
        </FormBox>
      </AuthFormWrapper>
    </>
  );
}
