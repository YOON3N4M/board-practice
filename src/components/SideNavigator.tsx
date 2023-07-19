import { styled } from "styled-components";
import { useState, useEffect } from "react";

const FloatingContainer = styled.div`
  display: flex;
  position: absolute;
  z-index: 1000;
`;

const SideNavigatorContainer = styled.div<{ heightvalue: string }>`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: ${props => props.heightvalue};
  background-color: #ffffff17;
  z-index: 1000;
  padding: 100px 0;
  button {
    margin-bottom: 30px;
  }
`;

const PanelContainer = styled.div<{ heightvalue: string }>`
  width: 470px;
  height: ${props => props.heightvalue};
  background-color: #0000ff49;
  z-index: 1000;
`;

interface SideNavigatorProps {
  ContainerHeightValue: number;
}

export default function SideNavigator({
  ContainerHeightValue,
}: SideNavigatorProps) {
  const [isPanelOn, setIsPanelOn] = useState(false);

  return (
    <>
      <FloatingContainer>
        <SideNavigatorContainer heightvalue={`${ContainerHeightValue}px`}>
          <button>멤버</button>
          <button>검색</button>
          <button>즐겨찾기</button>
          <button>설정</button>
        </SideNavigatorContainer>
        <PanelContainer heightvalue={`${ContainerHeightValue}px`} />
      </FloatingContainer>
    </>
  );
}
