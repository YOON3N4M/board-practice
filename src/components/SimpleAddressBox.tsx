import styled from "@emotion/styled";
import { useContext } from "react";
import { StateContext } from "@/util/StateContext";
import { MODAL_TYPE_ADD_POSITION } from "@/pages/map/[...mapId]";

const SmallAddressBox = styled.div`
  background-color: #ffffff;
  padding: 1rem 1rem;
  //transform: translateY(-60px);
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
    button {
      cursor: pointer;
      border: 0px;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background-color: #a7c9cf52;
      margin-top: 10px;
    }
    z-index: 2000;
  }
  .small-address-box-close {
    position: absolute;
    top: 0%;
    left: 100%;
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
  const { setSelectedModal } = useContext(StateContext);

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
          <button
            onClick={() => handlingRender()}
            className="small-address-box-close"
          >
            닫기
          </button>
          <div className="small-address-box-top-row">
            <span>{addressInfo}</span>
          </div>
          <div className="small-address-box-bottom-row">
            {addressInfo === ""}
            <button onClick={handleAddButton}>등록하기</button>
          </div>
        </SmallAddressBox>
      )}
    </>
  );
}
