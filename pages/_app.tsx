import type { AppProps } from "next/app";
import Head from "next/head";

import "nocturnal-ui-react/nocturnal-ui.css";

import "../styles/globals.css";

import "../styles/code-highlight.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, inital-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
