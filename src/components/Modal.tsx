import { MapDataT } from "@/data/sampleData";
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
  const contextData = useContext(StateContext);
  const mapData: MapDataT = contextData.mapDataFromDB[0];
  // 테스트 후 이름 바꿔야함
  function Form() {
    const [positionName, setPositionName] = useState("");
    const [selectedMember, setSelectedMember] = useState([]);

    function handleSelectedMember() {}
    return (
      <>
        <form className="submit-position-form">
          <input placeholder="장소의 별명을 입력하세요"></input>
          <span>주소:{selectedAddress}</span>
          <div className="member-row">
            {mapData.member.map(name => (
              <button>{name}</button>
            ))}
          </div>
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
