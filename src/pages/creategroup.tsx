import styled from "@emotion/styled";
import { AuthForm, AuthFormWrapper, FormBox } from "./register";
import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react";
import { SketchPicker } from "react-color";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import axios from "axios";
import { API_URL_CREATE_GROUP, API_URL_CREATE_MEMBERSHIP } from "./_app";
import { BiParty } from "react-icons/bi";
import { useRouter } from "next/router";

const FadeBox = chakra(motion.div, {});

export default function CreateGroup() {
  const session: any = useSession();
  const router = useRouter();

  const [isVisibleDetail, setIsVisibleDetail] = useState(false);
  const [groupName, setGroupName] = useState("");
  //true = 색상 커버, false = 사진 커버
  const [cover, setCover] = useState("색상");
  const [color, setColor] = useState("#397FB5");
  const [isColorPickerOn, setIsColorPickerOn] = useState(false);
  const [isResultModalOn, setIsResultModalOn] = useState(false);

  async function createGroupOnDB() {
    const groupRef = {
      groupName: groupName,
      //issue 사진 기능이 구현되면 이부분 수정 필요
      group_cover: color,
      group_leader: session.data?.user.id,
    };
    const groupRes = await axios
      .post(API_URL_CREATE_GROUP, groupRef)
      .then(res => {
        return res;
      })
      .catch(err => console.log(err));

    const membershipRef = {
      groupId: groupRes?.data?.groupId,
      userId: session.data?.user.id,
    };
    const membershipRes = await axios
      .post(API_URL_CREATE_MEMBERSHIP, membershipRef)
      .then(() => setIsResultModalOn(true));

    console.log(groupRes);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    createGroupOnDB();
  }
  //사진 커버 선택시 색상 커버로 강제하는 로직
  useEffect(() => {
    if (cover === "사진") {
      alert("현재 색상 커버만 설정 가능합니다.");
      setCover("색상");
    }
  }, [cover]);

  function onClickModalClose() {
    setIsResultModalOn(false);
    setTimeout(() => {
      router.push("/group");
    }, 500);
  }

  console.log(session);
  return (
    <>
      <Center w={"100%"} height={"100vh"}>
        <Flex
          position={"relative"}
          w={"500px"}
          direction={"column"}
          bgColor={"white"}
        >
          <Flex p={"20px 24px"}>
            <Text fontSize={"3xl"}>새 그룹</Text>
          </Flex>
          <Flex w={"100%"} p={"16px 24px"}>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <FormLabel>그룹 이름</FormLabel>
              <Input
                onChange={e => setGroupName(e.target.value)}
                value={groupName}
                required
                mb={"15px"}
              ></Input>
              <FormLabel>그룹 커버</FormLabel>
              <RadioGroup onChange={e => setCover(e)} value={cover} mb="15px">
                <Stack direction="row">
                  <Radio value="색상">색상</Radio>
                  <Radio value="사진" disabled>
                    사진
                  </Radio>
                </Stack>
              </RadioGroup>
              <Flex w={"100%"} mb={"30px"}>
                <Box
                  w={"100%"}
                  h={"120px"}
                  borderRadius={"8px"}
                  bgColor={color}
                  cursor={"pointer"}
                  onClick={() => setIsColorPickerOn(prev => !prev)}
                ></Box>
                <Box position={"relative"}>
                  <AnimatePresence>
                    {isColorPickerOn && (
                      <FadeBox
                        position={"absolute"}
                        left={"5"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key="color-picker-container"
                      >
                        <SketchPicker
                          color={color}
                          disableAlpha
                          onChange={color => setColor(color.hex)}
                        ></SketchPicker>
                      </FadeBox>
                    )}
                  </AnimatePresence>
                </Box>
              </Flex>
              <Flex justifyContent={"end"}>
                <Button color={"white"} bgColor={"blue.800"} type="submit">
                  생성
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Center>
      <Modal
        isOpen={isResultModalOn}
        onClose={() => setIsResultModalOn(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              bgColor={"white"}
            >
              <BiParty size={"5em"} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                그룹이 성공적으로 등록 되었습니다.
              </AlertTitle>
              <AlertDescription>그룹 화면으로 이동합니다.</AlertDescription>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor={"blue.800"}
              color={"white"}
              onClick={onClickModalClose}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
