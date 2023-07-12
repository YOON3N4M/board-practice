import Layout from "@/components/Layout";
import type { AppProps } from "next/app";

export const API_URL_USER_DATA = "http://localhost:3000/api/users/user-data"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
