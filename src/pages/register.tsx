import { User } from "@/@types/types";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "styled-components";
import { v4 as uuidv4 } from "uuid";

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
  const [userSex, setUserSex] = useState(0);

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

  async function registerUser(userData: User) {
    const API_URL = "http://localhost:3000/api/users/register";

    try {
      const response = await axios.post(API_URL, userData);
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(uuidv4());

    const UserDataTemp: User = {
      id: "abc1",
      account: userAccount,
      name: userName,
      password: userPassword,
      sex: userSex,
    };
    registerUser(UserDataTemp);
  }

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
