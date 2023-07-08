import Link from "next/link";
import { styled } from "styled-components";

export default function Navigator() {
  return (
    <>
      <Link legacyBehavior href="/">
        <a>홈</a>
      </Link>
      <Link legacyBehavior href="/register">
        <a>회원가입</a>
      </Link>
    </>
  );
}
