import { API_URL_INVITE } from "@/pages/_app";
import { GroupContext } from "@/util/StateContext";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

interface groupData {
  group_cover: string;
  group_leader: string;
  id: number;
  map_info: null;
  name: string;
}

export default function Invite() {
  const router: any = useRouter();
  const session = useSession();
  const context = useContext(GroupContext);
  const { setInviteURL } = context;
  const [inviteId, setInviteId] = useState("");
  const [groupData, setGroupData] = useState<groupData>();
  const [isModalOn, setIsModalOn] = useState(false);

  async function CheckInviteIdOnDB() {
    const params = {
      inviteId: inviteId,
    };
    const res = await axios.get(API_URL_INVITE, { params: params });
    setGroupData(res.data.group);
    setIsModalOn(true);
  }
  function goToHome() {
    setIsModalOn(false);
    setTimeout(() => {
      router.push("/");
    }, 500);
  }

  // params 유효성 확인 로직
  useEffect(() => {
    if (router?.query?.inviteId === undefined) return;
    setInviteId(router?.query?.inviteId[0]);
    setInviteURL(router?.query?.inviteId[0]);
  }, [router.query]);

  useEffect(() => {
    if (inviteId === "") return;
    CheckInviteIdOnDB();
  }, [inviteId]);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      alert("그룹 가입은 로그인 후 이용 하실 수 있습니다.");
      router.push("/login");
    }
  }, [session]);
  return (
    <>
      {session.status === "unauthenticated" ? null : (
        <>
          {groupData !== undefined && (
            <Modal isOpen={isModalOn} onClose={goToHome}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>그룹 가입하기</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                >
                  <Box
                    width={"150px"}
                    height={"150px"}
                    bgColor={groupData.group_cover}
                    borderRadius={"50%"}
                    mb={"10px"}
                  ></Box>
                  <Text fontWeight={"bold"} fontSize={"2xl"}>
                    {groupData.name}
                  </Text>
                  <Text mb={"30px"}>{groupData.name} 그룹에 참여 합니다.</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    창을 닫으면 홈으로 이동합니다.
                  </Text>
                  <Text></Text>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => setIsModalOn(false)}
                  >
                    가입
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
