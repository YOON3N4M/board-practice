import { useState, useEffect, useContext } from "react";

import { useSession } from "next-auth/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Heading,
  Text,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Flex,
  Center,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

import { BiParty } from "react-icons/bi";
import { GlobalContext } from "@/util/StateContext";
import { AuthForm, AuthFormWrapper, FormBox } from "../register";
import { API_URL_EDIT_PROFILE } from "../_app";
import { AnimatePresence } from "framer-motion";
import { FadeBox } from "../creategroup";
import { SketchPicker } from "react-color";
import { Image } from "@chakra-ui/next-js";
import { UserT } from "@/@types/types";

export default function Profile() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const { inviteURL, isLogin, setSessionUser } = useContext(GlobalContext);

  const [nickname, setNickname] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);
  const [profileCoverType, setProfileCoverType] = useState("color");
  const [isColorPickerOn, setIsColorPickerOn] = useState(false);
  const [color, setColor] = useState("#397FB5");

  function handleInputChange(e: any) {
    setNickname(e.target.value);
  }

  function CheckIsLoggedin() {
    if (isLogin === "unauthenticated") return;
    if (isLogin !== "authenticated") {
      alert("로그인이 필요한 서비스 입니다.");
      router.push("/login");
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    nickNameChangeAPI();
  }

  async function nickNameChangeAPI() {
    if (session === undefined || session === null) return;

    const bodyRef = {
      email: session.user?.email,
      nickname,
      color: profileCoverType === "google" ? null : color,
    };
    const response = await axios
      .put(API_URL_EDIT_PROFILE, bodyRef)
      .then(() => {
        setSessionUser((prev: UserT) => {
          return { ...prev, profileColor: color, nickname };
        });
        setIsModalOn(true);
      })
      .catch(err => alert("닉네임 설정에 실패했습니다."));
    // issue 세션 업데이트를 구현 못하겠음... 바로 아래 로직 활용하는 거 같은데,,,
    // 이게 없으면 새로고침을 해야해서 리소스가,,
    // const a = await update();
  }

  function onClickModalClose() {
    setIsModalOn(false);
    setTimeout(() => {
      if (inviteURL === undefined) {
        router.push("/group");
      } else {
        router.push(`http://localhost:3000/invite/${inviteURL}`);
      }
    }, 500);
  }

  useEffect(() => {
    CheckIsLoggedin();
  }, [session]);

  console.log(session);

  console.log(inviteURL);
  return (
    <>
      {status === "authenticated" && (
        <AuthFormWrapper>
          <FormBox>
            <AuthForm>
              <form onSubmit={handleSubmit}>
                <Heading fontSize={"2xl"} mb={"30px"}>
                  프로필 설정
                </Heading>

                <FormLabel>닉네임</FormLabel>
                <input
                  value={nickname}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={8}
                  placeholder="2글자~8글자 글자수 제한이 있습니다."
                  required
                ></input>
                <label>프로필 이미지</label>
                <RadioGroup
                  onChange={setProfileCoverType}
                  value={profileCoverType}
                  mb={"15px"}
                  mt={"5px"}
                >
                  <Stack direction="row">
                    <Radio value="color" size="sm">
                      색상 프로필 사용
                    </Radio>
                    <Radio value="google" size="sm">
                      구글 프로필 사용
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Box mb={"30px"}>
                  {profileCoverType === "color" && (
                    <>
                      <Center mb={"10px"}>
                        <Flex>
                          <Box
                            onClick={() => setIsColorPickerOn(prev => !prev)}
                            width={"80px"}
                            height={"80px"}
                            borderRadius={"50%"}
                            bgColor={color}
                            position={"relative"}
                            cursor={"pointer"}
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
                                  zIndex={"1000"}
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
                      </Center>
                      <Center>
                        {" "}
                        <Text fontSize={"sm"} color={"gray.400"}>
                          클릭해서 색상을 변경 해보세요!
                        </Text>
                      </Center>
                    </>
                  )}
                  {profileCoverType === "google" && (
                    <>
                      <Center>
                        <Box
                          width={"80px"}
                          height={"80px"}
                          borderRadius={"50%"}
                          overflow={"hidden"}
                        >
                          {session?.user?.image && (
                            <Image src={session?.user?.image} alt="google" />
                          )}
                        </Box>
                      </Center>
                    </>
                  )}
                </Box>
                <Button bgColor={"blue.800"} color={"white"} type="submit">
                  입력
                </Button>
              </form>
            </AuthForm>
          </FormBox>
        </AuthFormWrapper>
      )}
      <Modal isOpen={isModalOn} onClose={() => setIsModalOn(false)} isCentered>
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
                닉네임이 성공적으로 등록 되었습니다!
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
