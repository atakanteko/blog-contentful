import Head from "next/head";
import MantineProviderHoc from "@/layout/MantineProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Contentful Blog App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProviderHoc>
        <Component {...pageProps} />
      </MantineProviderHoc>
    </>
  );
}
