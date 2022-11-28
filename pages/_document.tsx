import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6477012025111935"
     crossOrigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6477012025111935"
     crossOrigin="anonymous"></script>
{/* <!-- Kotak --> */}
<ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client="ca-pub-6477012025111935"
     data-ad-slot="4370195745"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
