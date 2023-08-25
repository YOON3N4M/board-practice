import { API_URL_INVITE } from "@/pages/_app";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Invite() {
  const router: any = useRouter();
  const [inviteId, setInviteId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupCover, setGroupCover] = useState("");

  async function CheckInviteIdOnDB() {
    const params = {
      inviteId: inviteId,
    };
    const res = await axios.get(API_URL_INVITE, { params: params });
    console.log(res);
  }

  useEffect(() => {
    if (router?.query?.inviteId === undefined) return;
    setInviteId(router?.query?.inviteId[0]);
  }, [router.query]);

  useEffect(() => {
    if (inviteId === "") return;
    CheckInviteIdOnDB();
  }, [inviteId]);

  return <></>;
}
