import { useState, useEffect } from "react";
import { ThemeT } from "@/data/sampleData";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { KAKAO_API_SERVICE_URL } from "@/pages/_document";

declare global {
  interface Window {
    kakao: any;
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
  const [positionAtClick, setPositionAtClick] = useState<any>();
  console.log(positionAtClick);

  //useEffect 수정예정
  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
    // const geocoder = new window.kakao.maps.services.Geocoder();
  }, []);

  return (
    <>
      <Map
        center={mapOption.center}
        style={{ width: "100%", height: "100%" }}
        level={mapOption.level}
        onClick={(_t, mouseEvent) =>
          setPositionAtClick({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {positionAtClick && <MapMarker position={positionAtClick} />}
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
