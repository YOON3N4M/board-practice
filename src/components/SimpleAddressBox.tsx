import styled from "@emotion/styled";
import { useContext } from "react";
import { StateContext } from "@/util/StateContext";
import { MODAL_TYPE_ADD_POSITION } from "@/pages/map/[...mapId]";
import { Button, Flex, Text, HStack } from "@chakra-ui/react";
import { GrFormClose } from "react-icons/gr";
import { BiMap } from "react-icons/bi";

const SmallAddressBox = styled.div`
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  //transform: translateY(-60px);
  margin: 0px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .small-address-box-top-row {
    display: flex;
    flex-direction: column;
  }
  .small-address-box-bottom-row {
    display: flex;
    justify-content: right;
    z-index: 2000;
  }
  .small-address-box-close {
    background-color: white;
  }
`;

interface Props {
  setCoords: any;
  setIsOtherComponentOn: any;
  addressInfo: any;
  setAddressInfo: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SimpleAddressBox({
  setCoords,
  setIsOtherComponentOn,
  addressInfo,
  setAddressInfo,
}: Props) {
  const { setSelectedModal, selectedAddress, selectedPlace } =
    useContext(StateContext);

  function handlingRender() {
    setCoords(undefined);
    //이벤트 버블링을 위한 임시방편 ...
    setTimeout(() => {
      setAddressInfo(undefined);
      setIsOtherComponentOn(false);
    }, 100);
  }
  const { setIsModalOn } = useContext(StateContext);

  function handleAddButton() {
    setIsModalOn(true);
    setSelectedModal(MODAL_TYPE_ADD_POSITION);
  }

  return (
    <>
      {addressInfo !== undefined && (
        <SmallAddressBox>
          <Flex justifyContent={"end"}>
            <button
              onClick={() => handlingRender()}
              className="small-address-box-close"
            >
              <GrFormClose />
            </button>
          </Flex>
          <Flex direction={"column"} mb={"10px"}>
            <Text fontWeight={"bold"}>
              {" "}
              {selectedPlace === "" ? "" : selectedPlace}
            </Text>
            <HStack alignItems={"center"}>
              <BiMap color="gray" />
              <Text color={selectedPlace === "" ? "" : "gray"} fontSize={"sm"}>
                {addressInfo}
              </Text>
            </HStack>
          </Flex>
          <div className="small-address-box-bottom-row">
            <Button
              color={"white"}
              bgColor={"blue.800"}
              size={"xs"}
              onClick={handleAddButton}
            >
              등록하기
            </Button>
          </div>
        </SmallAddressBox>
      )}
    </>
  );
}
