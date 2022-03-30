import { Box, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { globalStyles } from "styles/global";

interface BlogProps {
  name: string;
  notionId: string;
  imageUrl?: string;
}

const BlogPosts: FC<{ data: BlogProps[] }> = ({ data }) => {
  return (
    <Box overflow="hidden" px="5">
      <Box m={2}>
        <Heading as="h2" size="lg" mb="5">
          All Posts
        </Heading>
      </Box>

      <Box
        d="grid"
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gridGap="2rem"
        px="5"
        py="10"
      >
        {data?.map((q) => {
          return (
            <Link href={`/learnings/${q.notionId}`} key={q.notionId}>
              <Box
                bg="white"
                d="grid"
                gridTemplateRows="max-content 1fr"
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                transition="0.5s ease-in"
                _hover={{
                  cursor: "pointer",
                  boxShadow: globalStyles.misc.boxShadow,
                }}
              >
                <Image
                  src={q?.imageUrl ?? "/assets/jpg/placeholder.jpg"}
                  height={300}
                  width={400}
                  objectFit="cover"
                  objectPosition="center center"
                  priority
                />
                <Heading
                  h="100%"
                  // bg="yellow"
                  d="grid"
                  placeContent="center"
                  textAlign="center"
                  mt="1"
                  fontWeight="normal"
                  as="h4"
                  lineHeight="tight"
                  fontSize="1rem"
                  p="4"
                >
                  {q.name}
                </Heading>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default BlogPosts;
