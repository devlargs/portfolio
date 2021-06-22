import { Box, Image, Tag, Grid, Heading } from "@chakra-ui/react";
import { globalStyles } from "styles/global";

const BlogPosts = () => {
  const property = [
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      tag: "Sample tag",
      title: "Modern home in city center in the heart of historic Los Angeles",
    },
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      tag: "Sample tag",
      title: "Modern home in city center in the heart of historic Los Angeles",
    },
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      tag: "Sample tag",
      title: "Modern home in city center in the heart of historic Los Angeles",
    },
    {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      tag: "Sample tag",
      title: "Modern home in city center in the heart of historic Los Angeles",
    },
  ];

  return (
    <>
      <Box m={2}>
        <Heading as="h2" size="lg">
          Blog Posts
        </Heading>
      </Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {property.map((q) => {
          return (
            <Box
              boxShadow={globalStyles.misc.boxShadow}
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={q.imageUrl} alt={q.imageAlt} />
              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Tag>Sample Tag</Tag>
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
          );
        })}
      </Grid>
    </>
  );
};

export default BlogPosts;
