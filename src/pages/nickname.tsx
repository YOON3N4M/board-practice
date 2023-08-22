import { useState, useEffect } from "react";
import { AuthForm, AuthFormWrapper, FormBox } from "./register";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL_CHANGE_NICKNAME } from "./_app";
import { BiParty } from "react-icons/bi";

export default function Nickname() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);

  function handleInputChange(e: any) {
    setNickname(e.target.value);
  }

  function CheckIsLoggedin() {
    if (session === undefined) return;
    if (status !== "authenticated") {
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

    const bodyRef = { email: session.user?.email, nickname };
    const response = await axios
      .put(API_URL_CHANGE_NICKNAME, bodyRef)
      .then(() => {
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
      router.push("/group");
    }, 500);
  }

  useEffect(() => {
    CheckIsLoggedin();
  }, [session]);

  console.log(session);
  return (
    <>
      {status === "authenticated" && (
        <AuthFormWrapper>
          <FormBox>
            <AuthForm>
              <form onSubmit={handleSubmit}>
                <Heading fontSize={"2xl"} mb={"30px"}>
                  새로운 닉네임
                </Heading>
                <Text fontSize={"sm"}>
                  정상적인 서비스 이용을 위해선 닉네임을 설정해야 합니다.
                </Text>
                <Text mb="15px" fontSize="11px" color={"gray"}>
                  서비스 이용 중 다른 사용자에게 노출되는 별명입니다.
                </Text>
                <label>사용할 닉네임 입력</label>
                <input
                  value={nickname}
                  onChange={handleInputChange}
                  minLength={2}
                  maxLength={8}
                  placeholder="2글자~8글자 글자수 제한이 있습니다."
                  required
                ></input>
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
