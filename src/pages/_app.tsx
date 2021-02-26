import Head from 'next/head';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
          rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
