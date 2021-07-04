import { Badge, Box, Center, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";
import { globalStyles } from "styles/global";

const LatestPosts = () => {
  const property = Array.from({ length: 4 }).map((q) => ({
    id: "1",
    badges: "New",
    title: "Lorem Ipsum Dolor Lorem Ipsum Dolor",
  }));

  const { colorMode } = useColorMode();
  console.log(colorMode);

  return (
    <Box h={400}>
      <Center h="50px">
        <Heading
          as="h2"
          size="md"
          isTruncated
          color={`typography.${colorMode}`}
        >
          Latest Posts
        </Heading>
      </Center>
      {property.map((q, i) => {
        return (
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow={globalStyles.misc.boxShadow}
            mb={4}
            key={q.id}
            bg="white"
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
                {q.title}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default LatestPosts;
