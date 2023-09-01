import {
  Text,
  Flex,
  Tab,
  TabList,
  Tabs,
  TabIndicator,
  HStack,
  Card,
  CardBody,
  Box,
  CardHeader,
  Center,
  VStack,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import { API_URL_CREATE_MEMBERSHIP } from "../_app";

import { useState, useEffect, useContext, useRef } from "react";
import { GroupT, MembershipAPIParams } from "@/@types/types";
import { GroupContext } from "@/util/StateContext";

export default function Group() {
  const navigate = useRouter();
  const session: any = useSession();
  const groupHorizonScroll: any = useRef(null);
  const contextData = useContext(GroupContext);

  const [ownGroup, setOwnGroup] = useState<GroupT[]>([]);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [prevScrollX, setPrevScrollX] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [clickedScrollX, setClickedScrollX] = useState(0);

  async function getOwnGroupByDB() {
    const params: MembershipAPIParams = {
      userId: session.data?.user?.id,
      requestType: 1,
    };

    const res = await axios
      .get(API_URL_CREATE_MEMBERSHIP, { params: params })
      .then(res => setOwnGroup(res.data.groupArr));
  }

  useEffect(() => {
    if (session.status === "unauthenticated" || session.status === "loading")
      return;

    getOwnGroupByDB();
  }, [session.status]);

  //횡 스크롤 관련 로직
  function onGroupCardClick(group: any) {
    if (isDrag) return;
    navigate.push(`/map/${group.id}`);
  }

  function handleDragStart(event: any) {
    setIsScrollActive(true);
    setPrevScrollX(event.clientX);
  }

  function handleDrag(event: any) {
    if (!isScrollActive) return;

    const maxWidth = groupHorizonScroll?.current?.scrollWidth;
    const xDifference = clickedScrollX - event.clientX;
    if (xDifference !== 0) {
      setIsDrag(true);
    }
    groupHorizonScroll.current.scrollLeft = prevScrollX + xDifference;
  }

  function handleDragEnd() {
    setTimeout(() => {
      setClickedScrollX(groupHorizonScroll.current.scrollLeft);
      setIsScrollActive(false);
      setIsDrag(false);
    }, 0);
  }

  return (
    <>
      <Flex m={"0 auto"} direction="column">
        <Tabs mt="15px" mb="30px" position="relative" variant="unstyled">
          <TabList color="gray">
            <Tab _selected={{ color: "black", fontWeight: "bold" }}>
              내 그룹
            </Tab>
            <Tab _selected={{ color: "black", fontWeight: "bold" }}>
              테스트1
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="black"
            borderRadius="1px"
          />
        </Tabs>
        <HStack
          spacing={"15px"}
          width={"800px"}
          bgColor={"gray.200"}
          paddingY={"30px"}
          pl="10px"
          overflowX={"scroll"}
          mb={"25px"}
          className="horizontal-scroll"
          ref={groupHorizonScroll}
          onMouseDown={e => handleDragStart(e)}
          onMouseUp={handleDragEnd}
          onMouseMove={e => handleDrag(e)}
        >
          <Card
            borderRadius={"4px"}
            shadow={""}
            bgColor="whiteAlpha.800"
            minW="170px"
            minH="180px"
            justifyContent={"center"}
            boxShadow={"md"}
            cursor={"pointer"}
            onClick={() => {
              navigate.push("/creategroup");
            }}
          >
            <Center w={"100%"} h={"100%"}>
              <VStack spacing={"13px"}>
                <Center>
                  <Center
                    w="60px"
                    h="60px"
                    bgColor={"blackAlpha.600"}
                    lineHeight="60px"
                    borderRadius={"50%"}
                  >
                    <FiPlus size={"2em"} color="white" />
                  </Center>
                </Center>
                <Box>
                  <Text>새 그룹 만들기</Text>
                </Box>
              </VStack>
            </Center>
          </Card>

          {ownGroup.length !== 0 &&
            ownGroup.map((group, idx) => (
              <Card
                key={idx}
                borderRadius={"4px"}
                shadow={""}
                bgColor="whiteAlpha.800"
                minW="170px"
                minH="180px"
                justifyContent={"center"}
                boxShadow={"md"}
                cursor={"pointer"}
                onClick={() => {
                  onGroupCardClick(group);
                }}
              >
                <Center w={"100%"} h={"100%"}>
                  <VStack spacing={"13px"}>
                    <Center>
                      <Center
                        w="60px"
                        h="60px"
                        bgColor={group.group_cover}
                        lineHeight="60px"
                        borderRadius={"50%"}
                      ></Center>
                    </Center>
                    <Box>
                      <Text>{group.name}</Text>
                    </Box>
                  </VStack>
                </Center>
              </Card>
            ))}
        </HStack>
        <Text fontWeight={"bold"} mb={"10px"}>
          내 타임라인
        </Text>
        <Divider borderBottomWidth={"3px"} borderColor={"black"} />
      </Flex>
    </>
  );
}
