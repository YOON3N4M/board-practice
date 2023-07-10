import { useRef } from "react";

export default function Home() {
  const test = useRef(null);
  console.log(test);

  return (
    <>
      <h1>홈임 ㅅㄱ</h1>
    </>
  );
}
