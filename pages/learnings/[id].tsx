import { Box, Heading } from "@chakra-ui/react";
import NOTION_API_URL from "constants/notionApiUrl";
import client from "helpers/sanityClient";
import { GetStaticPaths } from "next";
import Image from "next/image";
import "prismjs/themes/prism-tomorrow.css";
import { BLOG_IDS } from "queries/blogs.query";
import { LEARNINGS_BY_ID } from "queries/learnings.query";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";

export const getStaticPaths: GetStaticPaths = async () => {
  const types = await client.fetch(BLOG_IDS);

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

  return {
    props: {
      blockMap: data,
      name: details?.[0]?.name ?? "",
      banner:
        details?.[0]?.bannerUrl ??
        "https://images.unsplash.com/photo-1608597003542-9d831d8d6ff4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  };
}

const Slug = ({ blockMap, name, banner }) => {
  return (
    <>
      <Box w="110vw" ml="-10vw">
        <Image
          width={2000}
          height={400}
          src={banner}
          objectFit="cover"
          objectPosition="center center"
          quality={100}
          priority
        />
      </Box>
      <Box style={{ maxWidth: 900 }} margin="auto" p="10" bg="white">
        <Heading as="h1" mb="10" borderBottom="1px dotted lightgray" p="4">
          {name}
        </Heading>
        <NotionRenderer blockMap={blockMap} />
      </Box>
    </>
  );
};

export default Slug;
