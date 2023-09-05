import { useState, useContext } from "react";
import styled from "@emotion/styled";
import { PaddingBox } from "../PanelContents";
import { StateContext } from "@/util/StateContext";
import { sampleMember } from "../AddFavModal";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Flex,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { API_URL_INVITE } from "@/pages/_app";
import { PiClipboardTextBold } from "react-icons/pi";
import { UserT } from "@/@types/types";
import { useRouter } from "next/router";

const UserProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #5555cc;
`;

export default function Member() {
  const router: any = useRouter();
  const { groupMember } = useContext(StateContext);
  const [isModalOn, setIsModalOn] = useState(false);
  const [inviteURL, setInviteURL] = useState("");
  const [isCopyOk, setIsCopyOk] = useState(false);
  //const { member } = mapDataFromDB[0];

  function generateRandomString() {
    const codeLength = 8;
    const characters =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  //
  async function postCodeOnDB() {
    const inviteCode = generateRandomString();
    const data = {
      inviteCode: inviteCode,
      groupId: Number(router?.query?.mapId[0]),
      expired: "example",
    };

    try {
      const protocol = window.location.protocol;
      const host = window.location.host;

      const res = await axios.post(API_URL_INVITE, data);
      const URL = `${protocol}//${host}/invite/${inviteCode}`;
      setInviteURL(URL);
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        return postCodeOnDB();
      } else {
        console.log(err);
      }
    }
  }

  async function copyToClipBoard(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopyOk(true);
    } catch (err) {
      alert("에러가 발생했습닌다.");
    }
  }

  function onClickCopy() {
    if (inviteURL === "") return;
    copyToClipBoard(inviteURL);
  }

  console.log(typeof router?.query?.mapId[0]);
  return (
    <>
      <Button
        p={"10px 10px"}
        onClick={() => setIsModalOn(true)}
        m={"0 auto"}
        mt={"15px"}
      >
        새 멤버 초대하기
      </Button>
      {groupMember.length !== 0 &&
        groupMember.map((member: UserT) => (
          <PaddingBox key={member.id}>
            <div className="user-profile-image-box">
              <UserProfileImage />
            </div>
            <div className="member-right">
              <div>
                <Text fontSize={"15px"}>{member.nickname}</Text>
              </div>
              <div>
                <Text fontSize={"11px"}>등록한 장소 : 1</Text>
              </div>
            </div>
          </PaddingBox>
        ))}
      {isModalOn && (
        <Modal
          isOpen={isModalOn}
          onClose={() => setIsModalOn(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>초대 링크</ModalHeader>
            <ModalBody>
              <Flex direction={"column"}>
                <Button
                  onClick={onClickCopy}
                  colorScheme={"cyan"}
                  variant={"outline"}
                  mb={"10px"}
                  rightIcon={
                    inviteURL === "" ? undefined : <PiClipboardTextBold />
                  }
                >
                  {inviteURL}
                </Button>

                <Button
                  onClick={postCodeOnDB}
                  bgColor={"blue.800"}
                  color={"white"}
                  mb={"15px"}
                >
                  발급 받기
                </Button>
                {isCopyOk && (
                  <Alert status={"success"} borderRadius={"4px"}>
                    <AlertIcon />
                    <AlertDescription>링크가 복사 되었습니다!</AlertDescription>
                  </Alert>
                )}
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                bgColor={"blue.800"}
                color={"white"}
                onClick={() => setIsModalOn(false)}
              >
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
