import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { Analytics } from "../components/Analytics";

import "nocturnal-ui-react/nocturnal-ui.css";
import "../styles/globals.css";
import "../styles/code-highlight.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, inital-scale=1" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
