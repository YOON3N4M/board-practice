import { styled } from "styled-components";
import { useState, useEffect } from "react";

const SideNavigatorContainer = styled.div<{ heightvalue: string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 80px;
  height: ${props => props.heightvalue};
  background-color: #0000ff18;
  z-index: 1000;
`;

interface SideNavigatorProps {
  ContainerHeightValue: number;
}

export default function SideNavigator({
  ContainerHeightValue,
}: SideNavigatorProps) {
  const [ThemeArr, setThemeArr] = useState();

  function addTheme() {}

  return (
    <>
      <SideNavigatorContainer
        heightvalue={`${ContainerHeightValue}px`}
      ></SideNavigatorContainer>
    </>
  );
}
