import { User } from "@/@types/types";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { styled } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { API_URL_USER_DATA } from "./_app";

const RegisterFormWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  max-height: 100vh;
  min-height: 100vh;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
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
  }

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const gender = event.target.value;

    if (gender === "남자") {
      setUserSex(0);
    } else {
      setUserSex(1);
    }
  }

  async function registerUser(userData: User) {
    try {
      const response = await axios.post(API_URL_USER_DATA, userData);
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const UserDataTemp: User = {
      id: uuidv4(),
      account: userAccount,
      name: userName,
      password: userPassword,
      sex: userSex,
    };
    registerUser(UserDataTemp);
  }

  return (
    <>
      <RegisterFormWrapper>
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

          <select onChange={onSelectChange} name="gender">
            <option>남자</option>
            <option>여자</option>
          </select>
          <button type="submit">회원가입</button>
        </RegisterForm>
      </RegisterFormWrapper>
    </>
  );
}
