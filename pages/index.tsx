import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Home: FC = () => (
  <Box
    display="flex"
    flexDir={{
      base: 'column',
      lg: 'row',
    }}
  >
    <Box flex="1" color="white">
      <Box display="grid" placeContent="center" h="100vh" p="20px">
        <Box>
          <Text fontSize="60px" lineHeight="62px" mb="22px">
            Hi, I'm Ralph Largo
          </Text>
          <Text fontSize="48px">ReactJS Developer</Text>
          <Text fontSize="18px" color="#878e99">
            I’m a developer who has passion for building clean web applications with intuitive functionality. I enjoy
            the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always curious
            about learning new skills, tools, and concepts. In addition to working on various solo hobby projects, I
            have worked with creative teams, which involves daily stand-ups and communications, source control, and
            project management.
          </Text>
        </Box>
      </Box>
    </Box>
    <Box flex="1">
      <Box
        h={{
          base: 'initial',
          lg: '100vh',
        }}
        overflow={{
          base: 'auto',
          lg: 'scroll',
        }}
        overflowX={{
          base: 'auto',
          lg: 'hidden',
        }}
      >
        <Box h="200px" bg="red"></Box>
        <Box h="200px" bg="blue"></Box>
        <Box h="200px" bg="white"></Box>
        <Box h="200px" bg="green"></Box>
        <Box h="200px" bg="black"></Box>
        <Box h="200px" bg="yellow"></Box>
        <Box h="200px" bg="orange"></Box>
        <Box h="200px" bg="gold"></Box>
      </Box>
    </Box>
  </Box>
);

export default Home;
