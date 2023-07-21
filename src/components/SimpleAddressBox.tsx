import { styled } from "styled-components";
import { useContext } from "react";
import { StateContext } from "@/util/StateContext";
import { UNDEFINED_ADDRESS } from "./KakaoMap";

const SmallAddressBox = styled.div`
  background-color: #bbbbbb;
  padding: 1rem 1rem;
  //transform: translateY(-60px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .small-address-box-bottom-row {
    display: flex;
    justify-content: right;
    button {
      cursor: pointer;
    }
    z-index: 2000;
  }
  .small-address-box-close {
    position: absolute;
    top: 0%;
    left: 100%;
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
  function handlingRender() {
    setCoords(undefined);
    //이벤트 버블링을 위한 임시방편 ...
    setTimeout(() => {
      setAddressInfo(undefined);
      setIsOtherComponentOn(false);
    }, 100);
  }
  const data = useContext(StateContext);

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
          <div>
            <span>{addressInfo}</span>
          </div>
          <div className="small-address-box-bottom-row">
            {addressInfo !== UNDEFINED_ADDRESS && (
              <button onClick={() => data.setIsModalOn(true)}>등록하기</button>
            )}
          </div>
        </SmallAddressBox>
      )}
    </>
  );
}
