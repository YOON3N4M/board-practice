import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const KAKAO_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&autoload=false&libraries=services`;
  const KAKAO_API_SERVICE_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&autoload=false&libraries=services`;
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script src={KAKAO_API_URL} strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
