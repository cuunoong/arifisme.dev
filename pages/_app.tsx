import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../configs/next-seo.config'
import Cursor from '../components/cursor'
import { appWithTranslation } from 'next-i18next'
import translate from '../utils/translate'
function MyApp({ Component, pageProps, router: { locale } }: AppProps) {
  return (
    <>
      <Head>
        <title>{translate(locale).title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <Cursor />
    </>
  )
}

export default appWithTranslation(MyApp)
