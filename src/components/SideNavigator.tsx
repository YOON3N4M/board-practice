import styled from "@emotion/styled";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import PanelContents from "./PanelContents";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";
import { BiHomeAlt2 } from "react-icons/bi";
import { Box, Divider, Flex, VStack, Text, Center } from "@chakra-ui/react";
import { StateContext } from "@/util/StateContext";

const FloatingContainer = styled.div<{ heightvalue: string }>`
  display: flex;
  height: ${props => props.heightvalue};
  position: absolute;
  z-index: 1000;
`;

const SideNavigatorContainer = styled.div<{ heightvalue: string }>`
  display: flex;
  flex-direction: column;
  width: 80px;
  max-height: ${props => props.heightvalue};
  background-color: #ffffffc5;
  backdrop-filter: blur(10px);
  z-index: 1100;
  padding: 50px 0px;
  border-right: 1px solid #e2e8f0;
  button {
    font-size: 15px;
  }
`;

const PanelContainer = styled(motion.div)<{ heightvalue: string }>`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: ${props => props.heightvalue};
  background-color: #ffffff;
  z-index: 1000;
  .panel-hide-button {
    position: absolute;
    left: 100%;
    top: 40%;
    background-color: white;
    height: 50px;
  }
`;

interface SideNavigatorProps {
  ContainerHeightValue: number;
}

export const CONTENTS_MEMBER = "멤버";
export const CONTENTS_SEARCH = "검색";

export default function SideNavigator({
  ContainerHeightValue,
}: SideNavigatorProps) {
  const router = useRouter();
  const [isPanelOn, setIsPanelOn] = useState(false);
  const [selectedContents, setSelectedContents] = useState("");

  const { mapDataFromDB } = useContext(StateContext);

  function onMenuClick(event: any) {
    //홈 클릭시 홈으로 이동만
    if (event.target.name === "홈") {
      router.push("/group");
      return;
    }
    //타입을 지정하면 event.target.name 에 타입 오류가 나서 any로 일단 처리
    setSelectedContents(event.target.name);

    if (event.target.name === selectedContents) {
      setIsPanelOn(prev => !prev);
    } else {
      setIsPanelOn(true);
    }
  }

  console.log(mapDataFromDB);
  return (
    <>
      <FloatingContainer heightvalue={`${ContainerHeightValue}px`}>
        <SideNavigatorContainer heightvalue={`${ContainerHeightValue}px`}>
          <VStack spacing={"30px"}>
            <Flex direction={"column"} position={"relative"}>
              <button name="홈" onClick={event => onMenuClick(event)}>
                홈
              </button>
              <AnimatePresence>
                {!isPanelOn && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key="group-title"
                  >
                    <Center
                      position={"absolute"}
                      left={"100px"}
                      minWidth={"150px"}
                      bgColor={"white"}
                      p={"13px 10px"}
                      borderRadius={"4px"}
                      boxShadow={"md"}
                    >
                      <Text>{mapDataFromDB && mapDataFromDB.name}</Text>
                    </Center>
                  </motion.div>
                )}
              </AnimatePresence>
              <Divider borderColor={"gray.500"} mt={"15px"} />
            </Flex>

            <VStack spacing={"30px"}>
              <button name="멤버" onClick={event => onMenuClick(event)}>
                멤버
              </button>
              <button name="검색" onClick={event => onMenuClick(event)}>
                검색
              </button>
              <button name="테마" onClick={event => onMenuClick(event)}>
                테마
              </button>
              <button name="설정" onClick={event => onMenuClick(event)}>
                설정
              </button>
              <button name="타임라인" onClick={event => onMenuClick(event)}>
                타임라인
              </button>
            </VStack>
          </VStack>
        </SideNavigatorContainer>
        <AnimatePresence>
          {isPanelOn && (
            <PanelContainer
              key="panel-container"
              initial={{ opacity: 0, x: -1000 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 1, x: -1000 }}
              transition={{ duration: 0.5 }}
              heightvalue={`${ContainerHeightValue}px`}
            >
              <PanelContents selectedContents={selectedContents} />
              <button
                onClick={() => setIsPanelOn(false)}
                className="panel-hide-button"
              >
                <IoIosArrowBack />
              </button>
            </PanelContainer>
          )}
        </AnimatePresence>
      </FloatingContainer>
    </>
  );
}
