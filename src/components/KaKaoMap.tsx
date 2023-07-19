import { useState, useEffect } from "react";
import { ThemeT } from "@/data/sampleData";
import { Map, MapMarker } from "react-kakao-maps-sdk";

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
  //console.log(positionAtClick);

  const geocoder = new window.kakao.maps.services.Geocoder();
  console.log(geocoder);
  //useEffect 수정예정

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
