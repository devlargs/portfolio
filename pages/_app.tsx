import { Box, ChakraProvider, Text } from "@chakra-ui/react";
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
      <Box
        d="grid"
        placeContent="center"
        h="100vh"
        w="100vw"
        textAlign="center"
      >
        <>
          <Text mb="10" fontSize="20px">
            Currently undergoing maintenance. ralphlargo.com
          </Text>
          <iframe
            id="existing-iframe-example"
            width="640"
            height="360"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&enablejsapi=1"
          ></iframe>
        </>
      </Box>
    </ChakraProvider>
  );
};

export default App;
