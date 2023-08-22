import { SearchResultT } from "@/@types/types";
import { StyledFlexColumnBox, StyledFlexRowBox } from "@/styles/GlobalStyles";
import { StateContext } from "@/util/StateContext";
import {
  Box,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { HiSearch } from "react-icons/hi";
import { BiMap } from "react-icons/bi";
export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const {
    setCoords,
    setIsOtherComponentOn,
    selectedAddress,
    selectedPlace,
    setSelectedPlace,
    setCenterCoords,
  } = useContext(StateContext);

  const places = new kakao.maps.services.Places();

  const callback = function (result: any, status: any) {
    if (status === kakao.maps.services.Status.OK) {
      setSearchResult(result);
    }
  };

  function handleSearchInput(event: any) {
    setSearchKeyword(event.target.value);
  }

  function handleSearchForm(event: any) {
    event.preventDefault();
    places.keywordSearch(searchKeyword, callback);
  }

  function handleResultClick(result: SearchResultT) {
    setCoords({ lat: result.y, lng: result.x });
    setIsOtherComponentOn(true);
    setSelectedPlace(result.place_name);
    setCenterCoords({ lat: result.y, lng: result.x });
  }

  return (
    <>
      <form onSubmit={handleSearchForm}>
        <InputGroup
          size={"sm"}
          m="0 auto"
          mt={"10px"}
          mb={"10px"}
          width={"80%"}
          alignItems={"center"}
        >
          <InputRightElement cursor={"pointer"} onClick={handleSearchForm}>
            <HiSearch />
          </InputRightElement>
          <Input
            bgColor={"white"}
            placeholder="검색어 입력"
            onChange={handleSearchInput}
            value={searchKeyword}
          ></Input>
        </InputGroup>
      </form>
      <Text m={"0 auto"} mb={"8px"} fontSize={"xs"} color={"gray.400"}>
        검색결과를 클릭하면 지도에 표시됩니다
      </Text>
      <Divider />
      {searchResult.length !== 0 &&
        searchResult.map((result: SearchResultT) => {
          //추후 문제가 생기면 고유한 값인 id로 분기 처리를 해야함
          const isClicked = result?.address_name === selectedAddress;

          return (
            <>
              <Flex
                key={result.id}
                //issue 이 부분에서 좌표 말고 카페 이름 같은 정보도 넘기고 싶은데,,
                onClick={() => handleResultClick(result)}
                direction={"column"}
                p={"13px 15px"}
                borderBottom={"1px solid"}
                borderColor={"gray.200"}
                _hover={{ backgroundColor: "#b6cefd5c" }}
                cursor={"pointer"}
                bgColor={isClicked ? "#b6cefd5c" : ""}
              >
                <Flex alignItems={"center"}>
                  <BiMap />
                  <Text ml={"5px"}>{result?.place_name}</Text>
                  <Text ml={"5px"} fontSize={"xs"} color={"gray"}>
                    {result.category_group_name}
                  </Text>
                </Flex>
                <Text fontSize={"xs"} mb={"5px"}>
                  {result?.address_name}
                </Text>
                <Flex alignItems={"center"}>
                  {result?.phone === "" ? null : (
                    <Text fontSize={"xs"} color={"blue.500"} mr={"5px"}>
                      {result?.phone}
                    </Text>
                  )}

                  <a target="_blank" href={result.place_url} rel="noreferrer">
                    <Text
                      fontSize={"xs"}
                      color={"blue.500"}
                      _hover={{ textDecoration: "underline" }}
                    >
                      상세보기
                    </Text>
                  </a>
                </Flex>
              </Flex>
            </>
          );
        })}
    </>
  );
}
