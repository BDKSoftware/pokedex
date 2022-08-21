// Import Wrapper function for application
import Layout from "../components/Layout";

// Import Global CSS
import "../styles/globals.css";

// Functional definition for our app
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// Export of MyApp
export default MyApp;
