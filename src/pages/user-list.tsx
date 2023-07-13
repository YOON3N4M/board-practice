import axios from "axios";
import { API_URL_USER_DATA } from "./_app";
import { MouseEvent, useEffect, useState } from "react";
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
   alert(err);
  }
 }

 async function deleteUserData(id: string){
  try{
    const response = await axios.delete(API_URL_USER_DATA,{data: id})
    .then(()=>{
      const filteredArr = userDataArr.filter((userData)=> userData.id !== id);
      setUserDataArr(filteredArr);
    });
  } catch (err){
   alert(err);
  }
 }
 //해당 함수를 수정완료 버튼에 걸어주면 됨
 async function updateUserData(id: string){
  try{
    const response = await axios.put(API_URL_USER_DATA,{data: id});
  } catch(err){
   alert(err);
  }
 }

 function UserCard({userData}:any){
  const [isEditing,setIsEditing] = useState(false);

  return <>
   <div>
      <button onClick={()=>setIsEditing(true)}>수정</button>
      {isEditing? <input></input> : <span >{userData.name} | {userData.account}</span> }
      <button onClick={()=> deleteUserData(userData.id)}>삭제</button>
    </div>
  </>;
 }
 
useEffect(()=>{
  getUserDataFromDB();
},[]);

  return (
    <>
      <h1>유저목록</h1>
      <UserListContainer>
      {userDataArr.length > 0? userDataArr.map((userData:User)=> 
      <UserCard  key={userData.id} userData={userData}/> )
      : null}
      </UserListContainer>
    </>
  );
}
