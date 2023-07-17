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
  const KAKAO_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&autoload=false`;

  return (
    <>
      <Script src={KAKAO_API_URL} strategy="beforeInteractive" />
      <Map
        center={mapOption.center}
        style={{ width: "100%", height: "100%" }}
        level={mapOption.level}
      ></Map>
    </>
  );
}
