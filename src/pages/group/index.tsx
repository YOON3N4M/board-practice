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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import { API_URL_CREATE_MEMBERSHIP } from "../_app";

import { useState, useEffect, useContext, useRef } from "react";
import { GroupT, MembershipAPIParams } from "@/@types/types";
import { GlobalContext } from "@/util/StateContext";
import { routerPush } from "@/util/authUtils";

export default function Group() {
  const router = useRouter();
  const session: any = useSession();
  const groupHorizonScroll: any = useRef(null);
  const contextData = useContext(GlobalContext);

  const [ownGroup, setOwnGroup] = useState<GroupT[]>([]);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [prevScrollX, setPrevScrollX] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [clickedScrollX, setClickedScrollX] = useState(0);
  const [isModalOn, setIsModalOn] = useState(false);
  /** 1: 내 그룹, 2: 즐겨찾기 --- 즐겨찾기는 추후 변경 가능성 있음 */
  const [selectedTabContents, setSelectedTabContents] = useState(1);

  async function getOwnGroupByDB() {
    const params: MembershipAPIParams = {
      userId: session.data?.user?.id,
      requestType: 1,
    };

    const res = await axios
      .get(API_URL_CREATE_MEMBERSHIP, { params: params })
      .then(res => setOwnGroup(res.data.groupArr));
  }

  function handleModalButtonClick() {
    setIsModalOn(false);
    routerPush(router, "/login");
  }

  useEffect(() => {
    if (session.status === "loading") {
      return;
      //alert("로그인이 필요한 서비스 입니다.");
      // router.push("/login");
    } else if (session.status === "unauthenticated") {
      setIsModalOn(true);
    } else if (session.status === "authenticated") {
      getOwnGroupByDB();
    }
  }, [session.status]);

  //횡 스크롤 관련 로직
  function onGroupCardClick(group: any) {
    if (isDrag) return;
    router.push(`/map/${group.id}`);
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

  console.log(isModalOn);
  return (
    <>
      {session.status === "authenticated" && (
        <Flex m={"0 auto"} direction="column">
          <Tabs mt="15px" mb="30px" position="relative" variant="unstyled">
            <TabList color="gray">
              <Tab _selected={{ color: "black", fontWeight: "bold" }}>
                내 그룹
              </Tab>
              <Tab _selected={{ color: "black", fontWeight: "bold" }}>
                즐겨찾기
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="black"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                {" "}
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
                      router.push("/creategroup");
                    }}
                  >
                    <Center w={"100%"} h={"100%"}>
                      <VStack spacing={"13px"}>
                        <Center>
                          <Center
                            w="70px"
                            h="70px"
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
                                w="70px"
                                h="70px"
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
              </TabPanel>
              <TabPanel>
                <Flex w={"800px"}>개발중...🚧</Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Text fontWeight={"bold"} mb={"10px"}>
            내 타임라인
          </Text>
          <Divider borderBottomWidth={"3px"} borderColor={"black"} />
        </Flex>
      )}
      {isModalOn && (
        <Modal
          isOpen={isModalOn}
          onClose={() => setIsModalOn(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>
              로그인이 필요한 서비스 입니다. 로그인 페이지로 이동합니다.
            </ModalBody>
            <ModalFooter>
              <Button
                bgColor={"blue.800"}
                color={"white"}
                onClick={() => handleModalButtonClick()}
              >
                이동
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
