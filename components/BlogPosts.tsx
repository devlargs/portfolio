import { Box, Grid, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { globalStyles } from "styles/global";

interface BlogProps {
  name: string;
  notionId: string;
  imageUrl: string;
}

const BlogPosts: FC<{ data: BlogProps[] }> = ({ data }) => {
  return (
    <>
      <Box m={2}>
        <Heading as="h2" size="md">
          All Posts
        </Heading>
      </Box>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {data?.map((q) => {
          return (
            <Link href={`/learnings/${q.notionId}`}>
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                transition="0.5s ease-in"
                _hover={{
                  cursor: "pointer",
                  boxShadow: globalStyles.misc.boxShadow,
                }}
                bg="white"
              >
                <Image
                  src={q.imageUrl}
                  height={300}
                  width={400}
                  objectFit="fill"
                  objectPosition="center center"
                />
                <Box
                  p="6"
                  bg="white"
                  borderTop="1px dotted lightgray"
                  textAlign="center"
                >
                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                    {q.name}
                  </Box>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Grid>
    </>
  );
};

export default BlogPosts;
