import SideNavigator from "@/components/SideNavigator";
import MapNavigator from "@/components/map/MapNavigator";
import NaverMap from "@/components/map/NaverMap";
import { Box } from "@chakra-ui/react";

export default function Test() {
  return (
    <Box w={"100vw"} h={"100vh"} bgColor={"black"}>
      <MapNavigator />
      <Box w={"100vw"} h={"100vh"} bgColor={"black"}>
        <NaverMap />
      </Box>
    </Box>
  );
}
