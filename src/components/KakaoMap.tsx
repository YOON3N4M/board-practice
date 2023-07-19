import { useState, useEffect } from "react";
import { ThemeT } from "@/data/sampleData";
import { Map, MapMarker } from "react-kakao-maps-sdk";

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

interface coords {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  mapOption: MapOptionT;
  groupArr: ThemeT[];
}

interface AdressResult {
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
export default function KakaoMap({ mapOption, groupArr }: MapComponentProps) {
  const [coords, setCoords] = useState<coords>();
  const [addressInfo, setAddressInfo] = useState({});

  //좌표를 주소로 바꿔주는 메소드
  const geocoder = new window.kakao.maps.services.Geocoder();

  const callback: any = function (result: AdressResult[], status: any) {
    if (status === kakao.maps.services.Status.OK) {
      console.log("지역 명칭 : " + result[0].address.address_name);
      console.log("행정구역 코드 : " + result[0].address.region_3depth_name);
    }
    console.log(result, "상태");
  };

  //useEffect 수정예정
  useEffect(() => {
    if (coords === undefined) return;

    geocoder.coord2Address(coords.lng, coords.lat, callback);
  }, [coords]);
  return (
    <>
      <Map
        center={mapOption.center}
        style={{ width: "100%", height: "100%" }}
        level={mapOption.level}
        onClick={(_t, mouseEvent) =>
          setCoords({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {coords && <MapMarker position={coords} />}
        {groupArr.length !== 0
          ? groupArr.map(group =>
              group.positions.map(position => (
                <MapMarker
                  key={position.title}
                  title={position.title}
                  position={position.position}
                  image={group.marker}
                />
              ))
            )
          : null}
      </Map>
    </>
  );
}
