import Layout from "@/components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import AuthContext from "@/context/AuthContext";

export const API_URL_USER_DATA = "/api/user-data";
export const API_URL_EDIT_PROFILE = "/api/profile";
export const API_URL_CREATE_GROUP = "/api/group";
export const API_URL_CREATE_MEMBERSHIP = "/api/membership";
export const API_URL_INVITE = "/api/invite";
export const API_URL_THEME = "/api/theme";
export const API_URL_FAVORITE = "/api/favorite";

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
