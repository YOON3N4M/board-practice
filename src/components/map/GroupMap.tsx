import { Box, Center, Input } from "@chakra-ui/react";
import MapNavigator from "./mapComponent/MapNavigator";
import NaverMap from "./mapComponent/NaverMap";
import SearchAddress from "./mapComponent/SearchAddress";
import KakaoMap from "./mapComponent/KakaoMap";

export default function GroupMap() {
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
          <SearchAddress />
        </Center>
        <Box
          className="map-container"
          w={"100vw"}
          h={"100vh"}
          bgColor={"black"}
        >
          {/* <NaverMap /> */}
          <KakaoMap />
        </Box>
      </Box>
    </>
  );
}
