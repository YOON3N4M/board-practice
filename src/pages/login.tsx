import { ChangeEvent, useState } from "react";
import { styled } from "styled-components";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  input,
  button {
    width: 100px;
  }
  select {
    width: 100px;
  }
`;

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
    <>
      <div>
        <LoginForm>
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
            required
          />

          <button type="submit">로그인</button>
        </LoginForm>
      </div>
    </>
  );
}
