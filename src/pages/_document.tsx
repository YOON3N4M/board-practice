import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          type="text/javascript"
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=QiLKpy0gOOCMTer9uOeM6pa7ZzyNIT8Psj1ozzrQ"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
