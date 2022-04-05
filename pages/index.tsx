import { Box, Flex, Image, Text } from '@chakra-ui/react';
import SocialLinks from '@components/SocialMediaLinks';
import COMMONS from '@theme/commons';
import { FC } from 'react';

const Home: FC = () => (
  <Box bg="brand" px={COMMONS.px} color="white" pt="135px" pb="123px">
    <Flex justifyContent="space-between">
      <Box maxW="748px">
        <Text mb="1rem">Hello 👋</Text>
        <Text variant="gradient">I am Ralph Largo</Text>
        <Text fontSize="18px" lineHeight="28px" mb="2rem">
          I’m a developer who has passion for building clean web applications with intuitive functionality. I enjoy the
          process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always curious about
          learning new skills, tools, and concepts. In addition to working on various solo hobby projects, I have worked
          with creative teams, which involves daily stand-ups and communications, source control, and project
          management.
        </Text>
        <SocialLinks />
      </Box>

      <Box pos="relative">
        <Box pos="absolute" top={-10} left={-10} zIndex={0}>
          <Image src="/images/home/pattern.png" alt="Pattern" />
        </Box>
        <Image zIndex={1} src="/images/home/profile.png" pos="relative" maxW="400px" alt="Ralph Largo profile"></Image>
        <Box pos="absolute" bottom={-10} right={5} zIndex={2}>
          <Image src="/images/home/small-pattern.png" w="136px" h="125px" alt="Small Pattern" />
        </Box>
      </Box>
    </Flex>
  </Box>
);

export default Home;
