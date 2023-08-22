import { MapDataT, PositionT, coordsT } from "@/@types/types";
import KakaoMap from "@/components/KakaoMap";
import AddFavModal from "@/components/AddFavModal";
import SideNavigator from "@/components/SideNavigator";

import { defaultMapOption } from "@/data/sampleData";
import { StateContext } from "@/util/StateContext";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";

const MapContainer = styled.div<{ heightvalue: string }>`
  width: 100vw;
  height: ${props => props.heightvalue};
  overflow: hidden;
`;
//임시 api URL
export const API_URL_MAP = "http://localhost:4000/map";

export const MODAL_TYPE_ADD_POSITION = "addPosition";
export const MODAL_TYPE_SHOW_POSITION = "showPosition";

export default function Map() {
  const [ContainerHeightValue, setContainerHeightValue] = useState(0);
  const [isScriptLoading, setIsScriptLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");

  //useContext로 관리할 상태
  const [isModalOn, setIsModalOn] = useState(false);
  const [mapDataFromDB, setMapDataFromDB] = useState<MapDataT[]>([]);
  const [coords, setCoords] = useState<coordsT>();
  const [testPositionArr, setTestPositionArr] = useState<PositionT[]>([]);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<PositionT>();
  const [isOtherComponentOn, setIsOtherComponentOn] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState();
  //자동으로 스크롤이 없는 지도를 만들기 위해 선언 (근데 가끔 스크롤이 생김 왜지?)
  function setHTMLHeight() {
    const naviElement: HTMLElement | null = document.querySelector(".navi");

    if (naviElement === null) {
      setContainerHeightValue(window.innerHeight);
    } else {
      const ContainerHeight = window.innerHeight - naviElement.offsetHeight;
      setContainerHeightValue(ContainerHeight);
    }
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

  async function getMapDataFromDB() {
    const response = await axios
      .get(API_URL_MAP)
      .then(res => setMapDataFromDB(res.data));

    //test코드임
    const responseTest = await axios
      .get("http://localhost:4000/positions/")
      .then(res => setTestPositionArr(res.data));
  }
  useEffect(() => {
    setHTMLHeight();
    // getMapDataFromDB();
    setScriptLoad();
  }, []);

  return (
    <>
      <MapContainer heightvalue={`${ContainerHeightValue}px`}>
        <StateContext.Provider
          value={{
            setIsModalOn,
            selectedAddress,
            setSelectedAddress,
            mapDataFromDB,
            setMapDataFromDB,
            coords,
            setCoords,
            testPositionArr,
            setTestPositionArr,
            selectedModal,
            setSelectedModal,
            selectedPosition,
            setSelectedPosition,
            isOtherComponentOn,
            setIsOtherComponentOn,
            selectedPlace,
            setSelectedPlace,
          }}
        >
          {" "}
          {isModalOn && (
            <AddFavModal isModalOn={isModalOn} setIsModalOn={setIsModalOn} />
          )}
          <SideNavigator ContainerHeightValue={ContainerHeightValue} />
          {ContainerHeightValue !== 0 && isScriptLoading === false ? (
            <KakaoMap mapOption={defaultMapOption} />
          ) : null}
        </StateContext.Provider>
      </MapContainer>
    </>
  );
}
