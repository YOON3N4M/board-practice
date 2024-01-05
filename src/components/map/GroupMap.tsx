import { Box, Center, Input } from "@chakra-ui/react";
import MapNavigator from "./mapComponent/MapNavigator";
import NaverMap from "./mapComponent/NaverMap";

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
          <Input w={"200px"} bgColor={"white"} placeholder="검색"></Input>
        </Center>
        <Box
          className="map-container"
          w={"100vw"}
          h={"100vh"}
          bgColor={"black"}
        >
          <NaverMap />
        </Box>
      </Box>
    </>
  );
}
