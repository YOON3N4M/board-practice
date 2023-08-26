import { MapDataT, PositionT, ThemeT } from "@/@types/types";
import {
  MODAL_TYPE_ADD_POSITION,
  MODAL_TYPE_SHOW_POSITION,
} from "@/pages/map/[...mapId]";
import { StateContext } from "@/util/StateContext";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useContext } from "react";
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
  const [selectedMember, setSelectedMember] = useState<string[]>([]);
  const [positionMemo, setPositionMemo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const {
    mapDataFromDB,
    coords,
    selectedAddress,
    testPositionArr,
    setTestPositionArr,
    selectedModal,
    selectedPosition,
    selectedPlace,
  } = useContext(StateContext);
  if (!isModalOn) return null;

  // 테스트 후 이름 바꿔야함
  function AddPositionModal() {
    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const positionTemp: PositionT = {
        title: positionTitle,
        address: selectedAddress,
        coords: coords,
        // #issue id, addedBy 변경 해야함
        id: 0,
        addedBy: "세남", //issue: 이 부분 로그인 한 사람 자동 입력 (로그인 구현 후)
        member: selectedMember,
        positionMemo: positionMemo,
      };

      // const updatedMapData ={
      //   ...mapDataFromDB[0],
      //   theme:
      // }
    }

    function handlePositionMemoText(
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) {
      setPositionMemo(event.target.value);
    }

    function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
      setPositionTitle(event.target.value);

      const positionTemp: PositionT = {
        title: positionTitle,
        address: selectedAddress,
        coords: coords,
        // #issue id, addedBy 변경 해야함
        id: 2,
        addedBy: "세남",
        member: selectedMember,
        positionMemo: positionMemo,
      };

      console.log(positionTemp);
    }

    function handleSelectedMember(event: any) {
      const justClickedName: string = event.target.value;
      const isExist = selectedMember.includes(justClickedName);
      if (!isExist) {
        setSelectedMember(prev => [...prev, justClickedName]);
      } else {
        const removedArr = selectedMember.filter(
          name => name !== justClickedName
        );
        setSelectedMember(removedArr);
      }
    }

    return (
      <>
        <form onSubmit={handleFormSubmit} className="submit-position-form">
          <label>테마</label>
          <select>
            {/* {mapDataFromDB[0].theme.map((theme: ThemeT, idx: number) => (
              <option key={idx}>{theme.themeTitle}</option>
            ))} */}
            <option>여행</option>
          </select>
          <label>장소의 별명</label>
          <input
            value={positionTitle}
            onChange={handleTitleInput}
            placeholder="장소의 별명을 입력하세요"
            required
          ></input>
          <label>주소</label>
          <span>{selectedAddress}</span>
          <label>참여 멤버</label>
          <div className="flex-row-div">
            {selectedMember.map(name => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <span></span>
          <div className="flex-row-div">
            <button
              onClick={() => setSelectedMember(mapDataFromDB[0].member)}
              type="button"
            >
              전체 선택
            </button>
            <button onClick={() => setSelectedMember([])} type="button">
              전체 선택해제
            </button>
          </div>
          <div className="flex-row-div">
            {/* {mapDataFromDB[0].member.map((name: string, idx: number) => (
              <NotionticMemberButton
                onClick={handleSelectedMember}
                key={idx}
                type="button"
                value={name}
              >
                {name}
              </NotionticMemberButton>
            ))} */}
          </div>
          <label>사진</label>
          <button type="button">사진 추가하기</button>
          <label>메모</label>
          <textarea
            onChange={handlePositionMemoText}
            value={positionMemo}
          ></textarea>

          <button type="submit">등록하기!</button>
        </form>
      </>
    );
  }

  //issue 모달 선택 (sideNavigator랑 다른 방식의 조건부 렌더링인데 추후 둘중 한가지 방식으로 통일 요망)
  let ModalContents;

  switch (selectedModal) {
    case MODAL_TYPE_ADD_POSITION:
      ModalContents = <AddPositionModal />;
      break;
  }

  const sampleAddress = "서울특별시 강동구 어쩌구저쩌구";

  function setAllMember(isSetAll: boolean) {
    if (isSetAll) {
      setSelectedMember(sampleMember);
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

  console.log(selectedDate);
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
              {sampleTheme.map((theme, idx) => (
                <option key={idx} value={theme}>
                  {theme}
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
              {sampleMember.map((member, idx) => {
                const isExist = selectedMember.includes(member);
                function memberClick() {
                  if (isExist) {
                    const filterd = selectedMember.filter(
                      selected => selected !== member
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
                    {member}
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
