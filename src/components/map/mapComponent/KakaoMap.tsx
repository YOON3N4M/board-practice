import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { StateContext } from "@/util/StateContext";
import { Coord } from "@/types/map";
import SelectedMarker from "./SelectedMarker";

interface MapOptionT {
  center: { lat: number; lng: number };
  level: number;
}

interface Props {
  setIsMapLoad: Dispatch<SetStateAction<boolean>>;
  selectedCoord: Coord | undefined;
  setSelectedCoord: Dispatch<SetStateAction<Coord | undefined>>;
}

export const UNDEFINED_ADDRESS = "주소 정보가 없습니다.";

export default function KakaoMap(props: Props) {
  const { setIsMapLoad, selectedCoord, setSelectedCoord } = props;

  const contextData = useContext(StateContext);
  const [addressInfo, setAddressInfo] = useState<any>();
  const [map, setMap] = useState<any>();

  function onMapClick(mouseEvent: any) {
    setSelectedCoord({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  }

  //이벤트 버블링 현상때문에 작동에 제한을 두기 위함.

  // function onMapClick(mouseEvent: any) {
  //   if (isOtherComponentOn) return;
  //   //issue 이거 지도 전역으로 올려야함
  //   setIsOtherComponentOn(true);
  //   setCoords({
  //     lat: mouseEvent.latLng.getLat(),
  //     lng: mouseEvent.latLng.getLng(),
  //   });
  //   setSelectedPlace("");
  // }
  //지도 클릭시 주소 반환
  // function getAddressByCoords() {
  //   if (coords === undefined) return;
  //   //이걸로 하니까 깜빡거림
  //   const geocoder = new window.kakao.maps.services.Geocoder();

  //   const callback: any = function (result: AddressResult[], status: any) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       const addressResult = result[0].address.address_name;

  //       setAddressInfo(addressResult);
  //       contextData.setSelectedAddress(addressResult);
  //     } else {
  //       setAddressInfo(UNDEFINED_ADDRESS);
  //       contextData.setSelectedAddress("-");
  //     }
  //   };

  //   geocoder.coord2Address(coords.lng, coords.lat, callback);
  // }

  // //useEffect 수정예정
  // useEffect(() => {
  //   getAddressByCoords();
  // }, [coords]);

  // useEffect(() => {
  //   // console.log("있음");
  //   if (customOverlayContainer?.current?.a) {
  //     customOverlayContainer.current.a.style.margin = "0px";
  //   }
  // }, [coords]);

  return (
    <>
      <Map
        onCreate={mapObject => {
          setMap(mapObject);
          setIsMapLoad(true);
        }}
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        level={12}
        onClick={(_t, mouseEvent) => {
          onMapClick(mouseEvent);
        }}
        isPanto={true}
      >
        <SelectedMarker coord={selectedCoord} />
      </Map>
    </>
  );
}
