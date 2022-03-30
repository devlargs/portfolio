import { Box } from "@chakra-ui/react";
import BlogPosts from "components/BlogPosts";
import Container from "components/Container";
import Featured from "components/Featured";
import LatestPosts from "components/LatestPosts";
import client from "helpers/sanityClient";
import { LEARNINGS } from "queries/learnings.query";
import React from "react";
import { globalStyles } from "styles/global";

const TIL = ({ data }) => {
  return (
    <Container minH="calc(100vh - 160px)">
      <Box mt={globalStyles.container.marginTop} p="5">
        <Box
          d={{
            base: "inherit",
            lg: "flex",
          }}
        >
          <Box flex="1">
            <Featured />
          </Box>
          <Box
            width={{
              lg: "400px",
            }}
          >
            <LatestPosts data={data.slice(0, 4)} />
          </Box>
        </Box>
      </Box>
      <Box mt={globalStyles.container.marginTop}>
        <BlogPosts data={data} />
      </Box>
    </Container>
  );
};

export const getStaticProps = async () => {
  const data = await client.fetch(LEARNINGS);

  return {
    props: {
      data,
    },
    revalidate: 30,
  };
};

export default TIL;
