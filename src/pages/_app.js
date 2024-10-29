// pages/_app.js
import '../styles/globals.css'; // Import global CSS
import Home from './Home';

function MyApp({ Component, pageProps }) {
  return (
    <div className='App'>
      <Home/>
    </div>
  );
}

export default MyApp;
