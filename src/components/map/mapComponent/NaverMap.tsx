import useMapStore from "@/store";
import { Coord } from "@/types/map";
import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function NaverMap() {
  const mapRef = useRef(null);
  const [coord, setCoord] = useState<Coord>();
  const { setSelectedCoord }: any = useMapStore();

  function DrawMarker(positions: any) {}

  useEffect(() => {
    if (!mapRef.current) return;

    const options = {
      center: new naver.maps.LatLng(35.98818056, 127.9281444),
      zoom: 8,
    };
    const map = new naver.maps.Map(mapRef.current, options);
    // const markers = latlngs.forEach(
    //   position =>
    //     new naver.maps.Marker({
    //       position: new naver.maps.LatLng(position.lat, position.lng),
    //       map: map,
    //     })
    // );
    // 초기화후 지도 옵션 확인
    naver.maps.Event.once(map, "init", function () {
      console.log(map.getOptions());
    });

    map.addListener("click", function (e) {
      const coord = { lat: e.coord._lat, lng: e.coord._lng };
      setCoord(coord);
    });
  }, []);

  useEffect(() => {
    if (coord) {
      setSelectedCoord(coord);
    }
  }, [coord]);

  return <Box className="map" ref={mapRef} w={"100%"} height={"100%"}></Box>;
}
