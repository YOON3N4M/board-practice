import Layout from "@/components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import AuthContext from "@/context/AuthContext";

export const API_URL_USER_DATA = "/api/user-data";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    </ChakraProvider>
  );
}
