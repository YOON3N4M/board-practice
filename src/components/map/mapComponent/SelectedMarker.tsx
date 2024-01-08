import { Coord } from "@/types/map";
import { MapMarker } from "react-kakao-maps-sdk";

interface Props {
  coord: Coord | undefined;
}

export default function SelectedMarker(props: Props) {
  const { coord } = props;
  return <>{coord && <MapMarker position={coord} />}</>;
}
