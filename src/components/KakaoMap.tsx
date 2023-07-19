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

interface MapComponentProps {
  mapOption: MapOptionT;
  groupArr: ThemeT[];
}

export default function KakaoMap({ mapOption, groupArr }: MapComponentProps) {
  const [coords, setCoords] = useState<any>();
  console.log(coords);

  //좌표를 주소로 바꿔주는 메소드
  const geocoder = new window.kakao.maps.services.Geocoder();

  const callback = function (result: any, status: any) {
    if (status === kakao.maps.services.Status.OK) {
      console.log("지역 명칭 : " + result[0].adr);
      console.log("행정구역 코드 : " + result[0].code);
    }
    console.log(result, "상태");
  };

  //useEffect 수정예정
  useEffect(() => {
    geocoder.coord2Address(126.93990862062978, 37.56496830314491, callback);
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
