import { MapDataT, PositionT, ThemeT } from "@/@types/types";
import { MODAL_TYPE_ADD_POSITION, MODAL_TYPE_SHOW_POSITION } from "@/pages/map";
import { StateContext } from "@/util/StateContext";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useContext } from "react";
import styled from "@emotion/styled";

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

export default function Modal({ isModalOn, setIsModalOn }: Props) {
  const {
    mapDataFromDB,
    coords,
    selectedAddress,
    testPositionArr,
    setTestPositionArr,
    selectedModal,
    selectedPosition,
  } = useContext(StateContext);
  if (!isModalOn) return null;

  // 테스트 후 이름 바꿔야함
  function AddPositionModal() {
    const [positionTitle, setPositionTitle] = useState("");
    const [positionMemo, setPositionMemo] = useState("");
    const [selectedMember, setSelectedMember] = useState<string[]>([]);

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

      //test 코드임
      const TEST_URL = "http://localhost:4000/positions/";
      const response = await axios
        .post(TEST_URL, positionTemp)
        .then(res => setTestPositionArr((prev: any) => [...prev, positionTemp]))
        .catch(err => console.log(err));

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

  function ShowPositionModal() {
    return (
      <>
        <ShowPositionContainer>
          <h1>{selectedPosition?.title}</h1>
          <span>{selectedPosition?.address}</span>
          <div className="flex-row-div">
            {selectedPosition?.member?.map((name, idx) => (
              <NotionticMemberButton key={idx}>{name}</NotionticMemberButton>
            ))}
          </div>
          <p>{selectedPosition?.positionMemo}</p>
        </ShowPositionContainer>
      </>
    );
  }

  //issue 모달 선택 (sideNavigator랑 다른 방식의 조건부 렌더링인데 추후 둘중 한가지 방식으로 통일 요망)
  let ModalContents;

  switch (selectedModal) {
    case MODAL_TYPE_ADD_POSITION:
      ModalContents = <AddPositionModal />;
      break;
    case MODAL_TYPE_SHOW_POSITION:
      ModalContents = <ShowPositionModal />;
  }

  return (
    <>
      <ModalBackground initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalWindow>
          <button onClick={() => setIsModalOn(false)} className="modal-close">
            닫기
          </button>
          {ModalContents}
        </ModalWindow>
      </ModalBackground>
    </>
  );
}
