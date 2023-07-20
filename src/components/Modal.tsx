import { motion } from "framer-motion";
import React, { useState } from "react";
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
  // 테스트 후 이름 바꿔야함
  function Form() {
    const [positionName, setPositionName] = useState("");
    return (
      <>
        <form className="submit-position-form">
          <input placeholder="장소의 별명을 입력하세요"></input>
          <span>주소:{selectedAddress}</span>
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
