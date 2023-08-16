import { ChangeEvent, useState } from "react";
import { AuthForm, AuthFormWrapper, FormBox } from "./register";

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
          <h2>로그인 하기</h2>
          <label>아이디</label>
          <input
            name="account"
            value={userAccount}
            onChange={onInputChange}
            required
          />
          <label>비밀번호</label>
          <input
            name="password"
            value={userPassword}
            onChange={onInputChange}
            type="password"
            required
          />
          <button type="submit">로그인</button>
        </AuthForm>
      </FormBox>
    </AuthFormWrapper>
  );
}
