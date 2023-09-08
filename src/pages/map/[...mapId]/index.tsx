import {
  MapDataT,
  MembershipAPIParams,
  PositionT,
  coordsT,
} from "@/@types/types";
import KakaoMap from "@/components/KakaoMap";
import AddFavModal from "@/components/AddFavModal";
import SideNavigator from "@/components/SideNavigator";

import { StateContext } from "@/util/StateContext";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { API_URL_CREATE_MEMBERSHIP } from "@/pages/_app";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
  const router: any = useRouter();
  const session: any = useSession();

  const [ContainerHeightValue, setContainerHeightValue] = useState(0);
  const [isScriptLoading, setIsScriptLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState("");
  //useContext로 관리할 상태
  const [isModalOn, setIsModalOn] = useState(false);
  const [mapDataFromDB, setMapDataFromDB] = useState();
  const [coords, setCoords] = useState<coordsT>();
  const [testPositionArr, setTestPositionArr] = useState<PositionT[]>([]);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<PositionT>();
  const [isOtherComponentOn, setIsOtherComponentOn] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState();
  const [centerCoords, setCenterCoords] = useState({
    lat: 35.98818056,
    lng: 127.9281444,
  });
  const [groupMember, setGroupMember] = useState();
  const [isGroupMember, setIsGroupMember] = useState<undefined | boolean>();

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

  async function getMembersFromDB() {
    console.log(typeof router?.query?.mapId[0]);
    const params: MembershipAPIParams = {
      groupId: router?.query?.mapId[0],
      requestType: 2,
    };
    const res = await axios
      .get(API_URL_CREATE_MEMBERSHIP, { params: params })
      .then(res => {
        setGroupMember(res.data.userArr);
        setMapDataFromDB(res.data.group);
      });
  }

  async function checkUserGroupVerify() {
    const params: MembershipAPIParams = {
      groupId: router?.query?.mapId[0],
      requestType: 3,
      userId: session.data?.user?.id,
    };
    const response = await axios
      .get(API_URL_CREATE_MEMBERSHIP, { params: params })
      .then(res => {
        console.log(res.data.res);
        setIsGroupMember(res.data.res.length > 0 ? true : false);
      })
      .catch(() => {
        console.log("error");
      });
    console.log(response);
  }

  useEffect(() => {
    setHTMLHeight();
    setScriptLoad();
  }, []);

  useEffect(() => {
    if (router?.query?.mapId === undefined) return;
    getMembersFromDB();
    checkUserGroupVerify();
  }, [router?.query]);

  // useEffect(() => {
  //   if (session.status === "unauthenticated") {
  //     alert("로그인이 필요한 기능 입니다.");
  //   }

  //   if (session.status === "unauthenticated" || session.status === "loading")
  //     return;
  //   checkUserGroupVerify();
  // }, [session.status]);

  // useEffect(() => {
  //   if (isGroupMember === false) {
  //     alert("자신이 가입된 그룹에만 접근 할 수 있습니다.");
  //   }
  // }, [isGroupMember]);

  console.log(isGroupMember);
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
            centerCoords,
            setCenterCoords,
            groupMember,
          }}
        >
          {" "}
          {isModalOn && (
            <AddFavModal isModalOn={isModalOn} setIsModalOn={setIsModalOn} />
          )}
          <SideNavigator ContainerHeightValue={ContainerHeightValue} />
          {ContainerHeightValue !== 0 && isScriptLoading === false ? (
            <KakaoMap />
          ) : null}
        </StateContext.Provider>
      </MapContainer>
    </>
  );
}
