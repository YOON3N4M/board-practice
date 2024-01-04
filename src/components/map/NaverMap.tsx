import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = new naver.maps.Map(mapRef.current);
  }, []);

  return <Box ref={mapRef} w={"100%"} height={"100%"}></Box>;
}
