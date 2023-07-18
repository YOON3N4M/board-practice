import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";

interface MapOptionT {
  center: { lat: number; lng: number };
  level: number;
}

interface MapComponentProps {
  mapOption: MapOptionT;
}

export default function KakaoMap({ mapOption }: MapComponentProps) {
  return (
    <>
      <Map
        center={mapOption.center}
        style={{ width: "100%", height: "100%" }}
        level={mapOption.level}
      ></Map>
    </>
  );
}
