// Import any components you want to use
import Head from 'next/head'; // For SEO and meta tags
import Navbar from '../components/Navbar'; // Example reusable component

export default function Home() {
  return (
    <>
      {/* Head component adds metadata to the HTML <head> */}
      <Head>
        <title>Gabi

        </title>
        <meta name="description" content="Welcome to my Next.js application!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Optional: Navbar */}
      <Navbar />

      {/* Main content of the page */}
      <main>
        <h1>Gabi</h1>
        <p>This is the home page of your Next.js application.</p>
      </main>

      {/* Optional Footer */}
      <footer>
        <p>&copy; 2024 My Next.js App</p>
      </footer>
    </>
  );
}
