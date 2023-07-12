import axios from "axios";
import { API_URL_USER_DATA } from "./_app";
import { useEffect, useState } from "react";
import { User } from "@/@types/types";
import { styled } from "styled-components";


const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


export default function UserList() {

 const [userDataArr,setUserDataArr] = useState<User[]>([]); 

 async function getUserDataFromDB(){
  try{
    const response = await axios.get(API_URL_USER_DATA);
    setUserDataArr(response.data);
  } catch(err){
    console.log(err);
  }

 }

useEffect(()=>{
  getUserDataFromDB();
},[]);

  return (
    <>
      <h1>유저목록</h1>
      <UserListContainer>
      {userDataArr.length > 0? userDataArr.map((userData)=> <span key={userData.id}>{userData.name} | {userData.account}</span>): null}
      </UserListContainer>
    </>
  );
}
