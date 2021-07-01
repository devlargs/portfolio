import { Box, Image, Grid, Heading, Link } from "@chakra-ui/react";
import { globalStyles } from "styles/global";

const BlogPosts = ({ data }) => {
  console.log(data);

  return (
    <>
      <Box m={2}>
        <Heading as="h2" size="lg">
          Blog Posts
        </Heading>
      </Box>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {data?.map((q) => {
          return (
            <Link href={`/learnings/${q.slug}`}>
              <Box
                boxShadow={globalStyles.misc.boxShadow}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image
                  src={q.imageUrl}
                  h={350}
                  w="400px"
                  objectFit="cover"
                  layout={"fill"}
                  overflow="hidden"
                />
                <Box p="6">
                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
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
