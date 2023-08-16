import Link from "next/link";
import { styled } from "styled-components";

const NavigatorContainer = styled.div`
  width: 100vw;
  background-color: rgb(177, 177, 177);
  padding: 1rem 0;
  // border-bottom: 1px solid #6b6b6ba6;
`;

const Navi = styled.div`
  display: flex;
  margin: 0 auto;
  width: 350px;
  justify-content: space-between;
  // background-color: blue;
`;

export default function Navigator() {
  return (
    <>
      <NavigatorContainer className="navi">
        <Navi>
          <Link legacyBehavior href="/">
            <a>홈</a>
          </Link>
          <Link legacyBehavior href="/map">
            <a>맵</a>
          </Link>
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
