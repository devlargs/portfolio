import NProgress from "nprogress";
import "styles/tailwind.css";
import Footer from "components/Footer";
import Header from "components/Header";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const nprogressStart = () => NProgress.start();
    const nprogressDone = () => {
      NProgress.done();
    };
    router.events.on("routeChangeStart", nprogressStart);
    router.events.on("routeChangeComplete", nprogressDone);
    router.events.on("routeChangeError", nprogressDone);

    return () => {
      router.events.off("routeChangeStart", nprogressStart);
      router.events.off("routeChangeComplete", nprogressDone);
      router.events.off("routeChangeError", nprogressDone);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:400,500,700,900&display=swap"
        rel="stylesheet"
      />
      <main className="bg-white font-montserrat">
        <Header />
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
