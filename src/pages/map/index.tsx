import KakaoMap from "@/components/KakaoMap";
import SideNavigator from "@/components/SideNavigator";

import { defaultMapOption, groupArr } from "@/data/sampleData";

import { useState, useEffect } from "react";
import { styled } from "styled-components";

const MapContainer = styled.div<{ heightvalue: string }>`
  width: 100vw;
  height: ${props => props.heightvalue};
  overflow: hidden;
`;

export default function Map() {
  const [ContainerHeightValue, setContainerHeightValue] = useState(0);
  const [isScriptLoading, setIsScriptLoading] = useState(true);

  //자동으로 스크롤이 없는 지도를 만들기 위해 선언 (근데 가끔 스크롤이 생김 왜지?)

  function setHTMLHeight() {
    const naviElement: HTMLElement | null = document.querySelector(".navi");
    if (naviElement === null) return;
    const ContainerHeight = window.innerHeight - naviElement.offsetHeight;
    setContainerHeightValue(ContainerHeight);
  }

  function setScriptLoad() {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&libraries=services&autoload=false`;
    kakaoMapScript.className = "map-script";
    document.head.appendChild(kakaoMapScript);

    function onLoadKakaoAPI() {
      window.kakao.maps.load(() => {
        setIsScriptLoading(false);
      });
    }

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }

  useEffect(() => {
    setHTMLHeight();
    setScriptLoad();
  }, []);

  return (
    <>
      <MapContainer heightvalue={`${ContainerHeightValue}px`}>
        <SideNavigator ContainerHeightValue={ContainerHeightValue} />
        {ContainerHeightValue !== 0 && isScriptLoading === false ? (
          <KakaoMap groupArr={groupArr} mapOption={defaultMapOption} />
        ) : null}
      </MapContainer>
    </>
  );
}
