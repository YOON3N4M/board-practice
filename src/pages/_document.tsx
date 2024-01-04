import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          type="text/javascript"
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=f8ijn3o0md"
          strategy="beforeInteractive"
        ></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
