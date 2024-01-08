import { Box, Center, Input } from "@chakra-ui/react";
import MapNavigator from "./mapComponent/MapNavigator";
import NaverMap from "./mapComponent/NaverMap";
import LocalSearch from "./mapComponent/LocalSearch";
import KakaoMap from "./mapComponent/KakaoMap";
import { useEffect, useState } from "react";
import { Coord, PlaceResult } from "@/types/map";

export default function GroupMap() {
  //db에서 여러 정보들을 해당 단계에서 받아오면 될 것 같음.

  const [isMapLoad, setIsMapLoad] = useState(false);
  const [searchResult, setSearchResult] = useState<PlaceResult>();
  const [selectedCoord, setSelectedCoord] = useState<Coord>();

  useEffect(() => {
    console.log(isMapLoad);
  }, [isMapLoad]);

  useEffect(() => {
    console.log(selectedCoord);
  }, [selectedCoord]);
  return (
    <>
      <Box position={"relative"} w={"100vw"} h={"100vh"} bgColor={"black"}>
        <MapNavigator />
        <Center
          className="search-container"
          top={"25px"}
          position={"absolute"}
          w={"100%"}
          zIndex={99}
        >
          {isMapLoad && <LocalSearch setSearchResult={setSearchResult} />}
        </Center>
        <Box
          className="map-container"
          w={"100vw"}
          h={"100vh"}
          bgColor={"black"}
        >
          {/* <NaverMap /> */}
          <KakaoMap
            selectedCoord={selectedCoord}
            setIsMapLoad={setIsMapLoad}
            setSelectedCoord={setSelectedCoord}
          />
        </Box>
      </Box>
    </>
  );
}
