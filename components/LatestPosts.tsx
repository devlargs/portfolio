import { Badge, Box, Center, Heading, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { globalStyles } from "styles/global";

interface BlogProps {
  name: string;
  notionId: string;
  imageUrl: string;
}

const LatestPosts: FC<{ data: BlogProps[] }> = ({ data }) => {
  const { colorMode } = useColorMode();

  return (
    <Box h={400}>
      <Center h="50px" my="5">
        <Heading
          as="h2"
          size="lg"
          isTruncated
          color={`typography.${colorMode}`}
        >
          Latest Learnings
        </Heading>
      </Center>
      {data.map((q, i) => {
        return (
          <Link href={`/learnings/${q.notionId}`}>
            <Box
              m="auto"
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mb={4}
              key={q.notionId}
              bg="white"
              boxShadow={globalStyles.misc.boxShadow}
              transition="0.5s ease-in"
              _hover={{
                cursor: "pointer",
              }}
            >
              <Box p="4">
                <Box d="flex" alignItems="baseline">
                  <Badge
                    borderRadius="full"
                    px="2"
                    bg={`brand.${colorMode}`}
                    color="white"
                  >
                    {i === 0 && "NEWEST"}
                  </Badge>
                </Box>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                  color="black"
                >
                  {q.name}
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
};

export default LatestPosts;
