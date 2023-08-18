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
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Group() {
  const navigate = useRouter();

  return (
    <>
      <Flex paddingX="30%" direction="column">
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
          width={"100%"}
          bgColor={"gray.500"}
          paddingY={"30px"}
          pl="10px"
          overflowX={"scroll"}
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
                  <Box
                    w="60px"
                    h="60px"
                    bgColor={"black"}
                    lineHeight="60px"
                    borderRadius={"50%"}
                  >
                    +
                  </Box>
                </Center>
                <Box>
                  <Text>새 그룹 만들기</Text>
                </Box>
              </VStack>
            </Center>
          </Card>
        </HStack>
      </Flex>
    </>
  );
}
