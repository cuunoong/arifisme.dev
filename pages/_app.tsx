import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../configs/next-seo.config'
import Cursor from '../components/cursor'
import { appWithTranslation } from 'next-i18next'
import translate from '../utils/translate'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import * as gtag from '../utils/analytic'
import Script from 'next/script'
import animation from '../anim'

function MyApp({ Component, pageProps, router: { locale } }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Adding animation on load
  useEffect(() => {
    animation(router.pathname == '/' ? 'home' : 'detail')
  }, [])

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `        
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
      `,
        }}
      />
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
