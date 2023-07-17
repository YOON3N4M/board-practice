import Link from "next/link";
import { styled } from "styled-components";

const NavigatorContainer = styled.div`
  width: 100vw;
  //background-color: red;
  padding: 1rem 0;
`;

const Navi = styled.div`
  display: flex;
  margin: 0 auto;
  width: 400px;
  justify-content: space-between;
  // background-color: blue;
`;

export default function Navigator() {
  return (
    <>
      <NavigatorContainer>
        <Navi>
          <Link legacyBehavior href="/">
            <a>홈</a>
          </Link>

          <a href="/map">맵</a>

          <Link legacyBehavior href="/login">
            <a>로그인</a>
          </Link>
          <Link legacyBehavior href="/register">
            <a>회원가입</a>
          </Link>
          <Link legacyBehavior href="/user-list">
            <a>회원목록</a>
          </Link>
        </Navi>
      </NavigatorContainer>
    </>
  );
}
