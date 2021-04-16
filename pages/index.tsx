import { Button } from "@chakra-ui/button";
import { Box, Container, Text } from "@chakra-ui/layout";

export default function Home() {
  return (
    <Container mx="10" mt="10">
      <Box>
        <Button bg="red.100" color="white" mt="1">
          Button red 100
        </Button>
      </Box>

      <Box>
        <Button bg="red.300" color="white" mt="1">
          Button red 300
        </Button>
      </Box>

      <Box>
        <Button bg="red.500" color="white" mt="1">
          Button red 500
        </Button>
      </Box>

      <Box>
        <Button bg="red.700" color="white" mt="1">
          Button red 700
        </Button>
      </Box>

      <Box>
        <Button bg="red.900" color="white" mt="1">
          Button red 900
        </Button>
      </Box>

      <Text mt="10" fontSize="20" fontWeight="bold">
        Hello World Chakra and NextJS with Typescript!
      </Text>
    </Container>
  );
}
