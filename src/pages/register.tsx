import { User } from "@/@types/types";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { API_URL_USER_DATA } from "./_app";
import GoogleLogin from "@/components/login/GoogleLogin";

export const AuthFormWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  max-height: 100vh;
  min-height: 100vh;
`;

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 1rem 0.5rem;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  //overflow: hidden;
  width: 480px;
  box-shadow: 4px 12px 30px 6px rgba(0, 0, 0, 0.09);
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
  input,
  button {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    outline: none;
    border: 0px;
    margin-bottom: 15px;
  }
  input {
    padding: 0 1rem;
    box-sizing: border-box;
    background-color: #e4e4e4;
  }
  .disabled-button {
    cursor: default;

    background-color: #838383;
    color: white;
  }
`;

export const AuthForm = styled.div<{ $isVerify?: boolean }>`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  h2 {
    text-align: center;
  }
  label {
    margin-bottom: 5px;
    font-size: 0.8rem;
  }

  select {
    width: 25%;
  }
  small {
    color: gray;
    margin-top: -2px;
  }
  .input-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    margin: 0 auto;
  }
  .birth-select-row-div {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    margin-bottom: 15px;
    select {
      width: 31%;
    }
  }
  .verify-small {
    color: ${props => (props.$isVerify ? "#35ca4e" : "red")};
    font-weight: bold;
  }
`;

export default function Register() {
  const date = new Date();

  const [userName, setUserName] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userAccount, setUserAccount] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userVerifyPassword, setUserVerifyPassword] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [userBirth, setUserBirth] = useState();
  const [userSex, setUserSex] = useState(0);

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "name":
        setUserName(value);
        break;
      case "nickname":
        setUserNickname(value);
        break;
      case "account":
        setUserAccount(value);
        break;
      case "password":
        setUserPassword(value);
        break;
      case "verify-password":
        setUserVerifyPassword(value);
        break;
      default:
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
      const response = await axios
        .post(API_URL_USER_DATA, userData)
        .then(() => {
          alert("회원가입이 완료되었습니다.");
        });
      //console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const UserDataTemp: User = {
      id: uuidv4(),
      account: userAccount,
      username: userName,
      nickname: userNickname,
      password: userPassword,
    };
    registerUser(UserDataTemp);
  }

  function BirthSelect() {
    const thisYear = date.getFullYear();
    const year = [];
    const month = [];
    const day = [];
    //년
    for (let i = thisYear; i >= 1940; i--) {
      year.push(i);
    }
    //월
    for (let i = 1; i <= 12; i++) {
      month.push(i);
    }
    //일
    for (let i = 1; i <= 31; i++) {
      day.push(i);
    }

    return (
      <>
        <select>
          <option>출생연도</option>
          {year.map(year => (
            <option key={`year${year}`}>{year}</option>
          ))}
        </select>
        <select>
          <option>월</option>
          {month.map(month => (
            <option key={`month${month}`}>{month}</option>
          ))}
        </select>
        <select>
          <option>일</option>
          {day.map(day => (
            <option key={`day${day}`}>{day}</option>
          ))}
        </select>
      </>
    );
  }

  useEffect(() => {
    if (userPassword === userVerifyPassword) {
      setIsVerify(true);
    } else {
      setIsVerify(false);
    }
  }, [userVerifyPassword, userPassword]);

  return (
    <>
      <AuthFormWrapper>
        <FormBox>
          <AuthForm $isVerify={isVerify}>
            <form onSubmit={onSubmit}>
              <h2>계정 만들기</h2>
              <div className="input-box">
                <label>이름</label>
                <input
                  name="name"
                  value={userName}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <label>닉네임</label>
                <small>
                  서비스 이용시 다른 이용자들에게 보여지는 별명 입니다.
                </small>
                <input
                  name="nickname"
                  value={userNickname}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <label>아이디</label>
                <input
                  name="account"
                  value={userAccount}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <label>비밀번호</label>
                <input
                  name="password"
                  value={userPassword}
                  onChange={onInputChange}
                  type="password"
                  required
                />
              </div>
              <div className="input-box">
                <label>비밀번호 확인</label>
                <small className="verify-small">
                  {userPassword !== "" && userVerifyPassword !== "" ? (
                    <>
                      {isVerify
                        ? "비밀번호가 일치합니다."
                        : "비밀번호가 일치하지 않습니다."}
                    </>
                  ) : null}
                </small>
                <input
                  name="verify-password"
                  value={userVerifyPassword}
                  onChange={onInputChange}
                  type="password"
                  required
                />
              </div>

              {/* <select onChange={onSelectChange} name="gender">
              <option>남자</option>
              <option>여자</option>
            </select> */}
              <button className="disabled-button" type="submit">
                회원가입
              </button>
            </form>
            <GoogleLogin />
          </AuthForm>
        </FormBox>
      </AuthFormWrapper>
    </>
  );
}
