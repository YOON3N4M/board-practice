import Layout from "@/components/Layout";
import type { AppProps } from "next/app";

export const API_URL_USER_DATA = "/api/user-data";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
