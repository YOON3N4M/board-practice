import {
  MapDataT,
  MembershipAPIParams,
  PositionT,
  coordsT,
} from "@/@types/types";
import KakaoMap from "@/components/KakaoMap";
import AddFavModal from "@/components/AddFavModal";
import SideNavigator from "@/components/SideNavigator";

import { GlobalContext, StateContext } from "@/util/StateContext";

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { API_URL_CREATE_MEMBERSHIP } from "@/pages/_app";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { routerPush } from "@/util/authUtils";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface MapPropsT {
  query: any;
}

const MapContainer = styled.div<{ heightvalue: string }>`
  width: 100vw;
  height: ${props => props.heightvalue};
  overflow: hidden;
`;
//임시 api URL
export const API_URL_MAP = "http://localhost:4000/map";

export const MODAL_TYPE_ADD_POSITION = "addPosition";
export const MODAL_TYPE_SHOW_POSITION = "showPosition";

export default function Map({ query }: any) {
  const router: any = useRouter();
  const session: any = useSession();

  const { isLogin, sessionUser } = useContext(GlobalContext);

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
    if (isLogin === "unauthenticated") return;

    const params: MembershipAPIParams = {
      groupId: query.mapId[0],
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
    if (isLogin === "unauthenticated") return;
    const params: MembershipAPIParams = {
      groupId: query.mapId[0],
      requestType: 3,
      userId: sessionUser.id,
    };

    const response = await axios
      .get(API_URL_CREATE_MEMBERSHIP, { params: params })
      .then(res => {
        console.log(res.data.res);
        setIsGroupMember(
          res.data.res.length > 0
            ? //응답 값인 배열의 길이가 1 이상 (=해당 그룹에 속함.)
              () => {
                getMembersFromDB();
                return true;
              }
            : false
        );
      })
      .catch(() => {
        console.log("error");
      });
  }

  useEffect(() => {
    setHTMLHeight();
    setScriptLoad();
  }, []);

  useEffect(() => {
    checkUserGroupVerify();
  }, [isLogin]);

  useEffect(() => {
    if (isGroupMember === false) {
      alert("해당 그룹에 접근 권한이 없습니다.");
      routerPush(router, "/group");
    }
  }, [isGroupMember]);

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

export async function getServerSideProps(context: any) {
  return {
    props: { query: context.query },
  };
}
