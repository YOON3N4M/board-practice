import { ThemeT } from "@/data/sampleData";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface MapOptionT {
  center: { lat: number; lng: number };
  level: number;
}

interface MapComponentProps {
  mapOption: MapOptionT;
  groupArr: ThemeT[];
}

export default function KakaoMap({ mapOption, groupArr }: MapComponentProps) {
  return (
    <>
      <Map
        center={mapOption.center}
        style={{ width: "100%", height: "100%" }}
        level={mapOption.level}
      >
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
