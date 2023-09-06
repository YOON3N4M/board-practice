import { MapDataT, PositionT, ThemeT, UserT } from "@/@types/types";
import {
  MODAL_TYPE_ADD_POSITION,
  MODAL_TYPE_SHOW_POSITION,
} from "@/pages/map/[...mapId]";
import { StateContext } from "@/util/StateContext";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { BiMap } from "react-icons/bi";
import { AiOutlineCamera } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import {
  Badge,
  Button,
  ButtonGroup,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { API_URL_THEME } from "@/pages/_app";

const ModalBackground = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #00000090;
  z-index: 5000;
  cursor: pointer;
`;

const ModalWindow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 5rem 0;
  width: 500px;
  border-radius: 4px;
  background-color: white;
  .modal-close {
    position: absolute;
    left: 100%;
  }
  .flex-row-div {
    display: flex;
    flex-direction: row;
  }
  .submit-position-form {
    display: flex;
    flex-direction: column;
    width: 70%;
  }

  textarea {
    margin-bottom: 30px;
  }
  label {
    margin-top: 5px;
    margin-bottom: 5px;

    color: #222222;
  }
  select,
  input,
  textarea {
    border: 0px;
    border-bottom: 1px solid #a0a0a0;
    outline: none;
  }
`;

const ShowPositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    text-align: left;
    margin: 0px;
    margin-bottom: 5px;
  }
`;

export const NotionticMemberButton = styled.button`
  color: rgb(28, 56, 41);
  border: 0px;
  margin-right: 1px;
  background-color: rgb(219, 237, 219);
  cursor: pointer;
`;

interface Props {
  isModalOn: boolean;
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const sampleMember = [
  "길동",
  "철수",
  "영희",
  "보라",
  "두리",
  "수지",
  "영지",
  "정우",
  "현우",
  "상수",
  "현성",
  "차미",
];
export const sampleTheme = ["여행", "카페"];

export default function AddFavModal({ isModalOn, setIsModalOn }: Props) {
  //db에 올릴 정보
  const [positionTitle, setPositionTitle] = useState("");
  const [selectedMember, setSelectedMember] = useState<UserT[]>([]);
  const [positionMemo, setPositionMemo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [groupTheme, setGroupTheme] = useState([]);

  const {
    mapDataFromDB,
    coords,
    selectedAddress,
    testPositionArr,
    setTestPositionArr,
    selectedModal,
    selectedPosition,
    selectedPlace,
    groupMember,
  } = useContext(StateContext);

  // 테스트 후 이름 바꿔야함
  async function getThemeFromDB() {
    const params = { groupId: mapDataFromDB.id };
    const res = await axios.get(API_URL_THEME, { params: params });
    console.log(res.data.theme);
    setGroupTheme(res.data.theme);
  }

  useEffect(() => {
    getThemeFromDB();
  }, []);

  function setAllMember(isSetAll: boolean) {
    if (isSetAll) {
      // setSelectedMember(sampleMember);
    } else {
      setSelectedMember([]);
    }
  }

  function consoleRef() {
    const dataRef = {};
  }

  function handleDateChange(e: any) {
    setSelectedDate(e.target.value);
    console.log(typeof selectedDate, selectedDate);
  }

  console.log(selectedMember);
  return (
    <>
      <Modal isOpen={isModalOn} onClose={() => setIsModalOn(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} alignItems={"center"}>
            {selectedPlace === "" ? "새 즐겨찾기" : selectedPlace}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>테마</FormLabel>
            <Select size="sm" mb={"15px"}>
              {groupTheme.map((theme: any, idx) => (
                <option key={idx} value={theme.name}>
                  {theme.name}
                </option>
              ))}
            </Select>
            <FormLabel>즐겨찾기 이름</FormLabel>
            <Input size={"sm"} mb={"15px"}></Input>
            <FormLabel>주소</FormLabel>
            <InputGroup mb={"15px"}>
              <InputLeftElement>
                <BiMap color="gray" />
              </InputLeftElement>
              <Input size={"sm"} value={selectedAddress} disabled></Input>
            </InputGroup>
            <FormLabel>날짜</FormLabel>
            <Input
              //placeholder="Select Date and Time"
              size="sm"
              type="date"
              mb={"15px"}
              value={selectedDate}
              onChange={handleDateChange}
            />
            <FormLabel>참여 멤버</FormLabel>
            <ButtonGroup mb={"15px"}>
              <Button
                onClick={() => setAllMember(true)}
                bgColor={"rgb(219, 237, 219)"}
                size={"xs"}
              >
                전체선택
              </Button>
              <Button onClick={() => setAllMember(false)} size={"xs"}>
                전체해제
              </Button>
            </ButtonGroup>
            <HStack flexWrap={"wrap"} wordBreak={"break-word"} mb={"15px"}>
              {groupMember.map((member: UserT, idx: number) => {
                const isExist = selectedMember.some(
                  selected => selected.id === member.id
                );
                function memberClick() {
                  if (isExist) {
                    const filterd = selectedMember.filter(
                      selected => selected.id !== member.id
                    );
                    setSelectedMember(filterd);
                  } else {
                    setSelectedMember(prev => [...prev, member]);
                  }
                }
                const selectedColor = isExist ? "rgb(219, 237, 219)" : "";
                return (
                  <Badge
                    key={idx}
                    bgColor={selectedColor}
                    onClick={memberClick}
                    cursor={"pointer"}
                    p={"3px 9px"}
                  >
                    {member.nickname}
                  </Badge>
                );
              })}
            </HStack>
            <FormLabel>사진</FormLabel>
            <Button width={"100%"} height={"80px"} mb={"15px"}>
              <AiOutlineCamera />
            </Button>
            <FormLabel>메모</FormLabel>
            <Textarea size={"sm"}></Textarea>
          </ModalBody>
          <ModalFooter>
            <Button bgColor={"blue.800"} color={"white"} mr={"10px"}>
              등록
            </Button>
            <Button onClick={() => setIsModalOn(false)}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
