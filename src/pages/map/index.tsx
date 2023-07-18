import KakaoMap from "@/components/KaKaoMap";
import { useState, useEffect } from "react";
import { styled } from "styled-components";

export interface PositionT {
  id: number;
  title: string;
  position: { lat: number; lng: number };
}

export interface ThemeT {
  themeTitle: string;
  marker: MarkerT;
  positions: PositionT[];
}
interface MarkerT {
  src: string;
  size: { width: number; height: number };
}

const MapContainer = styled.div<{ heightvalue: string }>`
  width: 100vw;
  height: ${props => props.heightvalue};
  overflow: hidden;
`;

const SideNavigator = styled.div<{ heightvalue: string }>`
  position: absolute;
  display: flex;
  width: 80px;
  height: ${props => props.heightvalue};
  background-color: #0000ff18;
  z-index: 1000;
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

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  /* 
  포지션 배열이 여러개가 되어야 할듯
  ex) A그룹의 여행지(a배열), 카페(b배열) 각각 map((e)=> MapMarker) 식으로 
  */

  useEffect(() => {
    setHTMLHeight();
  }, []);

  const markerObj = {
    baseballRed: {
      src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
      size: { width: 64, height: 69 },
    },
    yellowStar: {
      src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      size: { width: 24, height: 35 },
    },
  };

  const groupArr: ThemeT[] = [
    {
      themeTitle: "카페 투어",
      //노란별
      marker: markerObj.baseballRed,
      positions: [
        {
          id: 1,
          title: "카페a",
          position: { lat: 33.450705, lng: 126.570677 },
        },
        {
          id: 2,
          title: "카페b",
          position: { lat: 33.450936, lng: 126.569477 },
        },
        {
          id: 3,
          title: "카페c",
          position: { lat: 33.450879, lng: 126.56994 },
        },
        {
          id: 4,
          title: "카페d",
          position: { lat: 33.451393, lng: 126.570738 },
        },
      ],
    },
    {
      themeTitle: "식당",
      //야구공
      marker: markerObj.yellowStar,
      positions: [
        {
          id: 1,
          title: "식당a",
          position: { lat: 33.550705, lng: 126.570677 },
        },
        {
          id: 2,
          title: "식당b",
          position: { lat: 33.550936, lng: 126.569477 },
        },
        {
          id: 3,
          title: "식당c",
          position: { lat: 33.550879, lng: 126.56994 },
        },
        {
          id: 4,
          title: "식당d",
          position: { lat: 33.551393, lng: 126.570738 },
        },
      ],
    },
  ];

  return (
    <>
      <MapContainer heightvalue={`${ContainerHeightValue}px`}>
        <SideNavigator heightvalue={`${ContainerHeightValue}px`} />
        {ContainerHeightValue !== 0 ? (
          <KakaoMap groupArr={groupArr} mapOption={defaultMapOption} />
        ) : null}
      </MapContainer>
    </>
  );
}
