// pages/_app.js
import '../styles/globals.css'; // Import global CSS
import '../styles/memoryGame.css';
import Head from 'next/head'; // Import the Head component


function MyApp({ Component, pageProps }) {
    return <>
    <Head>
      {/* Add the viewport meta tag */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>My Game</title> {/* Optionally set the title of the page */}
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp;
