import React, { useState, useEffect, useContext } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { styled } from "styled-components";
import SimpleAddressBox from "./SimpleAddressBox";
import { StateContext } from "@/util/StateContext";
import { MapDataT, ThemeT, coordsT } from "@/@types/types";

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

interface MapComponentProps {
  mapOption: MapOptionT;
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

export default function KakaoMap({ mapOption }: MapComponentProps) {
  const contextData = useContext(StateContext);
  const { coords, setCoords, mapDataFromDB } = contextData;
  const [addressInfo, setAddressInfo] = useState<any>();
  //이벤트 버블링 현상때문에 작동에 제한을 두기 위함.
  const [isOtherComponentOn, setIsOtherComponentOn] = useState(false);

  function onMapClick(mouseEvent: any) {
    if (isOtherComponentOn) return;
    setIsOtherComponentOn(true);
    setCoords({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
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
        center={mapOption.center}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        level={mapOption.level}
        onClick={(_t, mouseEvent) => {
          onMapClick(mouseEvent);
        }}
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

        {mapDataFromDB.length !== 0
          ? mapDataFromDB[0].theme.map((theme: ThemeT) =>
              theme?.positions?.map(position => (
                <>
                  {" "}
                  <MapMarker
                    key={position.title}
                    title={position.title}
                    position={position.coords}
                    image={theme.marker}
                  />
                </>
              ))
            )
          : null}
      </Map>
    </>
  );
}
