import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../configs/next-seo.config'
import Cursor from '../components/cursor'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Let’s learn to code an application - Arif Iskandar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <Cursor />
    </>
  )
}

export default MyApp
