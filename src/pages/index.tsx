import { styled } from "styled-components";

export default function Home() {
  return (
    <>
      <StyledSection backgroundColor="#e5bc7187" flexDirection="column">
        <h1>지도로 한눈에 보는 우리 모임의 추억</h1>
        <span>저번에 갔던 숙소 어디였지?, 이 음식 어디서 먹었더라?</span>
        <span>여행을 함께 재밌게 기록할 수 있는 방법 없을까?</span>
        <div>
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      </StyledSection>

      <StyledSection flexDirection="row">
        <MainPageImage></MainPageImage>
        <h2>추억의 장소를 함께 저장해요</h2>
      </StyledSection>

      <StyledSection flexDirection="row">
        <h2>장소에 대한 이야기를 나눠요</h2>
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section<{
  backgroundColor?: string;
  flexDirection: string;
}>`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  width: 100vw;
  border: 1px solid black;
  padding: 15rem 0;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "white"};

  * {
    text-align: center;
  }
`;

const MainPageImage = styled.div`
  height: 20rem;
  width: 20%;
  background-color: blue;
`;
