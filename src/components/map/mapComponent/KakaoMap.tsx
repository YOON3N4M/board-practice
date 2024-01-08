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

interface Props {
  setIsMapLoad: Dispatch<SetStateAction<boolean>>;
}

export const UNDEFINED_ADDRESS = "주소 정보가 없습니다.";

export default function KakaoMap(props: Props) {
  const { setIsMapLoad } = props;

  const contextData = useContext(StateContext);
  const [addressInfo, setAddressInfo] = useState<any>();
  const [map, setMap] = useState<any>();

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
          // onMapClick(mouseEvent);
        }}
        isPanto={true}
      >
        {/* {coords && (
          <>
            {" "}
            <>
              <MapMarker position={coords} />
              <CustomOverlayMap position={coords} ref={customOverlayContainer}>
                <SimpleAddressBox
                  setCoords={setCoords}
                  setIsOtherComponentOn={setIsOtherComponentOn}
                  addressInfo={addressInfo}
                  setAddressInfo={setAddressInfo}
                />
              </CustomOverlayMap>
            </>
          </>
        )} */}
        {/* 여기에 테스트 코드 넣고 테스트 해보기*/}
      </Map>
    </>
  );
}
