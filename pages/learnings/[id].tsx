import { Box, Heading } from "@chakra-ui/react";
import NOTION_API_URL from "constants/notionApiUrl";
import client from "helpers/sanityClient";
import { GetStaticPaths } from "next";
import "prismjs/themes/prism-tomorrow.css";
import { BLOG_IDS } from "queries/blogs.query";
import { LEARNINGS_BY_ID } from "queries/learnings.query";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";

export const getStaticPaths: GetStaticPaths = async () => {
  const types = await client.fetch(BLOG_IDS);

  console.log(types.map(({ notionId }) => notionId));

  return {
    paths: types.map(({ notionId }) => ({
      params: { id: notionId },
    })), //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export async function getStaticProps({ params }) {
  const data = await fetch(`${NOTION_API_URL}${params.id}`).then((res) =>
    res.json()
  );

  const details = await client.fetch(LEARNINGS_BY_ID, {
    notionId: params.id,
  });

  console.log(details);

  return {
    props: {
      blockMap: data,
      name: details?.[0]?.name ?? "",
    },
  };
}

const Slug = ({ blockMap, name }) => {
  return (
    <Box style={{ maxWidth: 900 }} margin="auto" p="10" bg="white">
      <Heading as="h1" mb="10" borderBottom="1px dotted lightgray" p="4">
        {name}
      </Heading>
      <NotionRenderer blockMap={blockMap} />
    </Box>
  );
};

export default Slug;
