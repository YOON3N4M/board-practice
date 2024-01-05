import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function MapNavigator() {
  return (
    <>
      <Box
        className="map-navigator"
        w={{ pc: "95px", mo: "100%" }}
        h={{ pc: "100%", mo: "100px" }}
        position={"absolute"}
        bottom={{ mo: 0 }}
        zIndex={99}
        backdropFilter={"blur(5px)"}
        bgColor={"#ffffffc5"}
        borderRight={"1px solid #e2e8f0"}
      >
        <Box w={"100%"} h={"100%"}>
          <Flex
            gap={"60px"}
            h={"80%"}
            justifyContent={"center"}
            direction={{ pc: "column" }}
          >
            <button>홈</button>
            <button>멤버</button>
            {/* 즐겨 찾기 안에 카테고리랑 타임라인이 들어가면 될듯?! */}
            <button>즐겨찾기</button>
            <button>설정</button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
