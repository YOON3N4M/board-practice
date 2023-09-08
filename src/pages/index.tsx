import styled from "@emotion/styled";
import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext, StateContext } from "@/util/StateContext";
import { useSession } from "next-auth/react";
import { Box, Button } from "@chakra-ui/react";

export const StyledSection = styled.section<{
  backgroundcolor?: string;
  flexdirection: string;
}>`
  display: flex;
  flex-direction: ${props => props.flexdirection};
  width: 100%;
  border: 1px solid black;
  padding: 15rem 30%;
  box-sizing: border-box;
  background-color: ${props =>
    props.backgroundcolor ? props.backgroundcolor : "white"};

  * {
    text-align: center;
  }
  .parent {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: red;
    width: 500px;
    height: 500px;
    cursor: pointer;
  }
  .child {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffd000;
    width: 300px;
    height: 300px;
  }
`;

const MainPageImage = styled.div`
  height: 20rem;
  width: 20%;
  background-color: blue;
`;

export default function Home() {
  const session = useSession();
  const { inviteURL } = useContext(GlobalContext);

  console.log(inviteURL);
  return (
    <>
      <StyledSection backgroundcolor="#e5bc7187" flexdirection="column">
        <h1>지도로 한눈에 보는 우리 모임의 추억</h1>
        <span>저번에 갔던 숙소 어디였지?, 이 음식 어디서 먹었더라?</span>
        <span>모두가 함께 여행을 기록할 수 있는 방법 없을까?</span>
        <div>개발중...🚧</div>
      </StyledSection>

      <StyledSection flexdirection="row">
        <MainPageImage></MainPageImage>
        <div>
          <h2>추억의 장소를 함께 기록해요</h2>
          <span>특별했던 경험, 여행지의 음식들을 떠올려 보세요!</span>
          <div>개발중...🚧</div>
        </div>
      </StyledSection>

      <StyledSection flexdirection="column">
        <h2>장소에 대한 이야기를 나눠요</h2>
        <div>개발중...🚧</div>
      </StyledSection>
    </>
  );
}
