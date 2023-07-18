import KakaoMap from "@/components/KaKaoMap";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

const MapContainer = styled.div<{ heightvalue: string }>`
  width: 100vw;
  height: ${props => props.heightvalue};
  overflow: hidden;
`;

export default function Map() {
  const [ContainerHeightValue, setContainerHeightValue] = useState(0);

  const defaultMapOption = {
    center: { lat: 35.98818056, lng: 127.9281444 },
    level: 12,
  };

  //자동으로 스크롤이 없는 지도를 만들기 위해 선언 (근데 가끔 스크롤이 생김 왜지?)
  function setHTMLHeight() {
    const naviElement: HTMLElement | null = document.querySelector(".navi");
    if (naviElement === null) return;
    const ContainerHeight = window.innerHeight - naviElement.offsetHeight;
    setContainerHeightValue(ContainerHeight);
  }

  useEffect(() => {
    setHTMLHeight();
  }, []);

  return (
    <>
      <MapContainer heightvalue={`${ContainerHeightValue}px`}>
        {ContainerHeightValue !== 0 ? (
          <KakaoMap mapOption={defaultMapOption} />
        ) : null}
      </MapContainer>
    </>
  );
}
