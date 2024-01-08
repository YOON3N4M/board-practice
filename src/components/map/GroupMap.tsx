import { Box, Center, Input } from "@chakra-ui/react";
import MapNavigator from "./mapComponent/MapNavigator";
import NaverMap from "./mapComponent/NaverMap";
import LocalSearch from "./mapComponent/LocalSearch";
import KakaoMap from "./mapComponent/KakaoMap";
import { useEffect, useState } from "react";

export default function GroupMap() {
  const [isMapLoad, setIsMapLoad] = useState(false);

  useEffect(() => {
    console.log(isMapLoad);
  }, [isMapLoad]);
  return (
    <>
      <Box position={"relative"} w={"100vw"} h={"100vh"} bgColor={"black"}>
        <MapNavigator />
        <Center
          top={"25px"}
          className="search-container"
          position={"absolute"}
          w={"100%"}
          zIndex={99}
        >
          {isMapLoad && <LocalSearch />}
        </Center>
        <Box
          className="map-container"
          w={"100vw"}
          h={"100vh"}
          bgColor={"black"}
        >
          {/* <NaverMap /> */}
          <KakaoMap setIsMapLoad={setIsMapLoad} />
        </Box>
      </Box>
    </>
  );
}
