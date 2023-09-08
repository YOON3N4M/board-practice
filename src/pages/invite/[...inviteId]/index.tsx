import { API_URL_CREATE_MEMBERSHIP, API_URL_INVITE } from "@/pages/_app";
import { GlobalContext } from "@/util/StateContext";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
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
  const session: any = useSession();

  const { setInviteURL } = useContext(GlobalContext);
  const [inviteId, setInviteId] = useState("");
  const [groupData, setGroupData] = useState<groupData>();
  const [isModalOn, setIsModalOn] = useState(false);
  const [status, setStatus] = useState<any>("");

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

  async function createMembershipOnDB() {
    if (groupData === undefined) return;

    const membershipRef = {
      groupId: groupData.id,
      userId: session?.data?.user?.id,
    };
    const membershipRes = await axios
      .post(API_URL_CREATE_MEMBERSHIP, membershipRef)
      .then(() => {
        setStatus("success");
        setTimeout(() => {
          router.push("/group");
        }, 3000);
      })
      .catch(err => {
        setStatus("warning");
        setTimeout(() => {
          router.push("/group");
        }, 3000);
      });
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

  console.log(groupData);
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
                  {status === "" ? (
                    <Text fontSize={"sm"} color={"gray.400"}>
                      창을 닫으면 홈으로 이동합니다.
                    </Text>
                  ) : (
                    <Alert
                      status={status}
                      borderRadius={"4px"}
                      flexDirection={"column"}
                    >
                      <Flex>
                        <AlertIcon />
                        {status === "success"
                          ? "가입이 성공적으로 완료 되었습니다."
                          : "이미 가입된 그룹 입니다."}
                      </Flex>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        3 초후 그룹으로 이동합니다.
                      </Text>
                    </Alert>
                  )}
                </ModalBody>

                <ModalFooter>
                  {status === "success" ? null : (
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => createMembershipOnDB()}
                    >
                      가입
                    </Button>
                  )}
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
