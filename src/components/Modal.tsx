import { MapDataT, PositionT, ThemeT } from "@/@types/types";
import { StateContext } from "@/util/StateContext";
import { motion } from "framer-motion";
import React, { useState, useContext } from "react";
import { styled } from "styled-components";

const ModalBackground = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #00000090;
  z-index: 5000;
`;

const ModalWindow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 5rem 0;
  width: 500px;

  background-color: white;
  .modal-close {
    position: absolute;
    left: 100%;
  }
  .submit-position-form {
    display: flex;
    flex-direction: column;
    .member-row {
      display: flex;
    }
  }
`;

interface Props {
  isModalOn: boolean;
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAddress: string;
}

export default function Modal({
  isModalOn,
  setIsModalOn,
  selectedAddress,
}: Props) {
  const { mapDataFromDB } = useContext(StateContext);

  // 테스트 후 이름 바꿔야함
  function Form() {
    const [positionTitle, setPositionTitle] = useState("");
    const [selectedMember, setSelectedMember] = useState<string[]>([]);

    function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
      setPositionTitle(event.target.value);

      // const positionTemp: PositionT = {
      //   id: 2,
      //   title: positionTitle,
      // };
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
        <form className="submit-position-form">
          <label>테마</label>
          <select>
            {mapDataFromDB[0].theme.map((theme: ThemeT, idx: number) => (
              <option key={idx}>{theme.themeTitle}</option>
            ))}
          </select>
          <input
            value={positionTitle}
            onChange={handleTitleInput}
            placeholder="장소의 별명을 입력하세요"
          ></input>
          <span>주소:{selectedAddress}</span>
          <div className="member-row">
            {selectedMember.map(name => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <div className="member-row">
            {mapDataFromDB[0].member.map((name: string, idx: number) => (
              <button
                onClick={event => handleSelectedMember(event)}
                key={idx}
                type="button"
                value={name}
              >
                {name}
              </button>
            ))}
          </div>
          <button>사진 추가하기</button>
          <label>메모</label>
          <textarea></textarea>

          <button>등록하기!</button>
        </form>
      </>
    );
  }

  return (
    <>
      <ModalBackground initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalWindow>
          <button onClick={() => setIsModalOn(false)} className="modal-close">
            닫기
          </button>

          <Form />
        </ModalWindow>
      </ModalBackground>
    </>
  );
}
