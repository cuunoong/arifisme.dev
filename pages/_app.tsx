import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'

function MyApp({ Component, pageProps }: AppProps<{ title: string }>) {
  const title = Component.title || 'It`s me Arif Iskandar - Software Developer'
  return (
    <div className="container font-gt-walsheim-pro antialiased">
      <Header title={title} />
      <main className="mb-[50px] sm:mb-20">
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
