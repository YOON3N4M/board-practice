import axios from "axios";
import { API_URL_USER_DATA } from "./_app";
import { useEffect, useState } from "react";
import { User } from "@/@types/types";

interface UserCardProps {
  userData: User;
}

export default function UserList() {
  const [userDataArr, setUserDataArr] = useState<User[]>([]);

  async function getUserDataFromDB() {
    try {
      const response = await axios.get(API_URL_USER_DATA);
      setUserDataArr(response.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    getUserDataFromDB();
  }, []);

  return (
    <>
      <h1>유저목록</h1>
    </>
  );
}
