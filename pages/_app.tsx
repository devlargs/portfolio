import "styles/tailwind.css";
import Footer from "components/Footer";
import Header from "components/Header";

function MyApp({ Component, pageProps }) {
  // TODO - Uncomment this when maintenance is done
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,900&display=swap" rel="stylesheet" />
      <main className="bg-white font-montserrat">
        <Header />
      <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );

}

export default MyApp;
