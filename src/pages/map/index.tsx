import KakaoMap from "@/components/KaKaoMap";
import { styled } from "styled-components";

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export default function Map() {
  const defaultMapOption = {
    center: { lat: 35.98818056, lng: 127.9281444 },
    level: 12,
  };

  return (
    <>
      <MapContainer>
        <KakaoMap mapOption={defaultMapOption} />
      </MapContainer>
    </>
  );
}
