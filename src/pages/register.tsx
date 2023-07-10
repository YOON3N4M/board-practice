import { ChangeEvent, useState } from "react";
import { styled } from "styled-components";

const RegisterForm = styled.form`
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
  const [userName, setUserName] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userSex, setUserSex] = useState("남자");

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "name":
        setUserName(value);
        break;
      case "account":
        setUserAccount(value);
        break;
      case "password":
        setUserPassword(value);
        break;
    }
    console.log(userName, userAccount, userPassword);
  }

  function onSubmit() {}

  async function registerUser() {}
  return (
    <>
      <div>
        <RegisterForm onSubmit={onSubmit}>
          <label>이름</label>
          <input
            name="name"
            value={userName}
            onChange={onInputChange}
            required
          />
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
          <select name="gender">
            <option>남자</option>
            <option>여자</option>
          </select>
          <button type="submit">회원가입</button>
        </RegisterForm>
      </div>
    </>
  );
}
