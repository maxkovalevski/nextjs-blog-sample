import type { AppProps } from "next/app";
import Head from "next/head";

import { MainLayout } from "../components/MainLayout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Head>
        <meta name="viewport" content="width=device-width, inital-scale=1" />
      </Head>
      <Component {...pageProps} />
    </MainLayout>
  );
}
export default MyApp;
