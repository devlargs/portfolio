import { Box } from "@chakra-ui/react";
import BlogPosts from "components/BlogPosts";
import Featured from "components/Featured";
import LatestPosts from "components/LatestPosts";
import client from "helpers/sanityClient";
import { LEARNINGS } from "queries/learnings.query";
import React from "react";
import { globalStyles } from "styles/global";

const TIL = ({ data }) => {
  return (
    <>
      <Box mt={globalStyles.container.marginTop}>
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
            <LatestPosts />
          </Box>
        </Box>
      </Box>
      <Box mt={globalStyles.container.marginTop}>
        <BlogPosts data={data} />
      </Box>
    </>
  );
};

export const getStaticProps = async () => {
  const data = await client.fetch(LEARNINGS);
  return {
    props: {
      data,
    },
  };
};

export default TIL;
