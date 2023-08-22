import React, { useState, useEffect, useContext } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import SimpleAddressBox from "./SimpleAddressBox";
import { StateContext } from "@/util/StateContext";
import { MapDataT, PositionT, ThemeT, coordsT } from "@/@types/types";
import { MODAL_TYPE_SHOW_POSITION } from "@/pages/map/[...mapId]";

declare global {
  interface Window {
    // kakao.maps.d.ts 를 추가 하면서 필요 없어짐
    // kakao: any;
  }
}

interface MapOptionT {
  center: { lat: number; lng: number };
  level: number;
}

interface AddressResult {
  address: {
    address_name: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    zip_code: string;
  };
  road_address: {
    address_name: string;
    building_name: string;
    main_building_no: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    sub_building_no: string;
    underground_yn: string;
    zone_no: string;
  };
}

export const UNDEFINED_ADDRESS = "주소 정보가 없습니다.";

export default function KakaoMap() {
  const contextData = useContext(StateContext);
  const {
    coords,
    setCoords,
    mapDataFromDB,
    testPositionArr,
    setSelectedModal,
    setIsModalOn,
    setSelectedPosition,
    isOtherComponentOn,
    setIsOtherComponentOn,
    setSelectedPlace,
    centerCoords,
  } = contextData;
  const [addressInfo, setAddressInfo] = useState<any>();
  //이벤트 버블링 현상때문에 작동에 제한을 두기 위함.

  function onMapClick(mouseEvent: any) {
    if (isOtherComponentOn) return;
    //issue 이거 지도 전역으로 올려야함
    setIsOtherComponentOn(true);
    setCoords({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
    setSelectedPlace("");
  }
  //지도 클릭시 주소 반환
  function getAddressByCoords() {
    if (coords === undefined) return;
    //이걸로 하니까 깜빡거림
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback: any = function (result: AddressResult[], status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const addressResult = result[0].address.address_name;

        setAddressInfo(addressResult);
        contextData.setSelectedAddress(addressResult);
      } else {
        setAddressInfo(UNDEFINED_ADDRESS);
        contextData.setSelectedAddress("-");
      }
    };
    geocoder.coord2Address(coords.lng, coords.lat, callback);
  }

  //useEffect 수정예정
  useEffect(() => {
    getAddressByCoords();
  }, [coords]);

  return (
    <>
      <Map
        center={centerCoords}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        level={12}
        onClick={(_t, mouseEvent) => {
          onMapClick(mouseEvent);
        }}
        isPanto={true}
      >
        {coords && (
          <>
            {" "}
            <MapMarker position={coords} />
            <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
              // 커스텀 오버레이가 표시될 위치입니다
              position={coords}
              // 커스텀 오버레이가에 대한 확장 옵션
              xAnchor={0.3}
              yAnchor={0.91}
            >
              <SimpleAddressBox
                setCoords={setCoords}
                setIsOtherComponentOn={setIsOtherComponentOn}
                addressInfo={addressInfo}
                setAddressInfo={setAddressInfo}
              />
            </CustomOverlayMap>
          </>
        )}
        {/* 여기에 테스트 코드 넣고 테스트 해보기*/}
        {testPositionArr.length !== 0
          ? testPositionArr.map((position: PositionT) => (
              <MapMarker
                key={position.title}
                title={position.title}
                position={position.coords}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                  size: {
                    width: 24,
                    height: 35,
                  },
                }}
                onClick={() => {
                  setSelectedModal(MODAL_TYPE_SHOW_POSITION);
                  setIsModalOn(true);
                  setSelectedPosition(position);
                }}
              />
            ))
          : null}
      </Map>
    </>
  );
}
