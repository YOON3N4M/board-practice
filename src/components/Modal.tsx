import { motion } from "framer-motion";
import React from "react";
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
  width: 500px;
  height: 500px;
  background-color: white;
  .modal-close {
    position: absolute;
    left: 100%;
  }
`;

interface Props {
  isModalOn: boolean;
  setIsModalOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ isModalOn, setIsModalOn }: Props) {
  return (
    <>
      <ModalBackground initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalWindow>
          <button onClick={() => setIsModalOn(false)} className="modal-close">
            닫기
          </button>
        </ModalWindow>
      </ModalBackground>
    </>
  );
}
