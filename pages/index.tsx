import { Box, chakra, Text } from '@chakra-ui/react';
import ContentContainer from '@components/ContentContainer';
import { FC } from 'react';
import defaults from 'theme/defaults';

const Home: FC = () => (
  <Box
    display="flex"
    flexDir={{
      base: 'column',
      lg: 'row',
    }}
  >
    <Box flex="1" color="white">
      <Box display="grid" placeContent="center" h="100vh" p="80px">
        <Box>
          <Text fontSize="60px" lineHeight="62px" mb="8px" fontWeight="bold" as="h1">
            Hi, I'm <chakra.span color={defaults.primary}>Ralph Largo</chakra.span>
          </Text>
          <Text fontSize="48px" as="h1" fontWeight="bold">
            ReactJS Developer.
          </Text>
          <Text fontSize="18px" color="#878e99">
            Passionate developer experienced in building clean and intuitive web applications with ReactJS, dedicated to
            constantly expanding skills and collaborating effectively with creative teams.
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
        py="60px"
        px="100px"
      >
        <ContentContainer title="About Me">
          <Text fontSize="18px" color="#878e99" mb="25px">
            I’m a developer who has passion for building clean web applications with intuitive functionality. I enjoy
            the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always curious
            about learning new skills, tools, and concepts.
          </Text>
          <Text fontSize="18px" color="#878e99">
            In addition to working on various solo hobby projects, I have worked with creative teams, which involves
            daily stand-ups and communications, source control, and project management.
          </Text>
        </ContentContainer>

        <ContentContainer title="About My Skill">
          <Text fontSize="18px" color="#878e99" mb="25px">
            I’m a developer who has passion for building clean web applications with intuitive functionality. I enjoy
            the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always curious
            about learning new skills, tools, and concepts.
          </Text>
          <Text fontSize="18px" color="#878e99">
            In addition to working on various solo hobby projects, I have worked with creative teams, which involves
            daily stand-ups and communications, source control, and project management.
          </Text>
        </ContentContainer>

        <ContentContainer title="About Me">
          <Text fontSize="18px" color="#878e99" mb="25px">
            I’m a developer who has passion for building clean web applications with intuitive functionality. I enjoy
            the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always curious
            about learning new skills, tools, and concepts.
          </Text>
          <Text fontSize="18px" color="#878e99">
            In addition to working on various solo hobby projects, I have worked with creative teams, which involves
            daily stand-ups and communications, source control, and project management.
          </Text>
        </ContentContainer>

        <ContentContainer title="About Me">
          <Text fontSize="18px" color="#878e99" mb="25px">
            I’m a developer who has passion for building clean web applications with intuitive functionality. I enjoy
            the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always curious
            about learning new skills, tools, and concepts.
          </Text>
          <Text fontSize="18px" color="#878e99">
            In addition to working on various solo hobby projects, I have worked with creative teams, which involves
            daily stand-ups and communications, source control, and project management.
          </Text>
        </ContentContainer>

        <ContentContainer title="About Me">
          <Text fontSize="18px" color="#878e99" mb="25px">
            I’m a developer who has passion for building clean web applications with intuitive functionality. I enjoy
            the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always curious
            about learning new skills, tools, and concepts.
          </Text>
          <Text fontSize="18px" color="#878e99">
            In addition to working on various solo hobby projects, I have worked with creative teams, which involves
            daily stand-ups and communications, source control, and project management.
          </Text>
        </ContentContainer>

        <ContentContainer title="About Me">
          <Text fontSize="18px" color="#878e99" mb="25px">
            I’m a developer who has passion for building clean web applications with intuitive functionality. I enjoy
            the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always curious
            about learning new skills, tools, and concepts.
          </Text>
          <Text fontSize="18px" color="#878e99">
            In addition to working on various solo hobby projects, I have worked with creative teams, which involves
            daily stand-ups and communications, source control, and project management.
          </Text>
        </ContentContainer>
      </Box>
    </Box>
  </Box>
);

export default Home;
