import { Box, Badge, Center, Heading } from "@chakra-ui/layout";
import { globalStyles } from "styles/global";


const LatestPosts = () => {
  const property = [
    {
      id:"1",
      badges: "New",
      title: "Modern home in city center in the heart of historic Los Angeles",
    },
    {
      id:"2",
      badges: "New",
      title: "Modern home in city center in the heart of historic Los Angeles",
    },
    {
      id:"3",
      badges: "New",
      title: "Modern home in city center in the heart of historic Los Angeles",
    },
    {
      id:"4",
      badges: "New",
      title: "Modern home in city center in the heart of historic Los Angeles",
    },
  ];
  return (
    <Box>
        <Center h="50px">
          <Heading as="h1" size="md" isTruncated>
            LATEST POSTS
          </Heading>
        </Center>
      {property.map((q) => {
        return (
          <>
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow={globalStyles.misc.boxShadow}
              mb={4}
              key={q.id}
            >
              <Box p="4">
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {q.badges}
                  </Badge>
                </Box>
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {q.title}
                </Box>
              </Box>
            </Box>
          </>
        );
      })}
    </Box>
  );
};

export default LatestPosts;
