import { ChakraProvider } from "@chakra-ui/react";
import Container from "components/Container";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { Fonts } from "styles/Fonts";
import { Progress } from "styles/Progress";
import { theme } from "theme";

const App = ({ Component, pageProps }) => {
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
    <ChakraProvider theme={theme}>
      <Progress />
      <Fonts />
      <Navbar />
      <Container minH="calc(100vh - 160px)">
        <Component {...pageProps} />
      </Container>
      <Footer />
    </ChakraProvider>
  );
};

export default App;
