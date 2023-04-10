import { Box, chakra, Text } from '@chakra-ui/react';
import ContactForm from '@components/ContactForm';
import ContentContainer from '@components/ContentContainer';
import Portfolio from '@components/Portfolio';
import Skills from '@components/Skills';
import Testimonials from '@components/Testimonials';
import { PRIMARY_SKILLS, SECONDARY_SKILLS } from 'constants/skills';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import defaults from 'theme/defaults';

const Home: FC = () => {
  const router = useRouter();

  const isPortfolio = Boolean(router.query.portfolio);

  return (
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
            <Box h="180px" w="180px" mb="20px">
              <Image
                src="/images/ralph.jpg"
                width={3968}
                height={4016}
                alt="Logo"
                style={{ borderRadius: '50%', border: `5px solid #32363b` }}
              />
            </Box>
            <Text fontSize="60px" lineHeight="62px" mb="8px" fontWeight="bold" as="h1">
              Hi, I'm <chakra.span color={defaults.primary}>Ralph Largo</chakra.span>
            </Text>
            <Text fontSize="48px" as="h1" fontWeight="bold">
              ReactJS Developer.
            </Text>
            <Text fontSize="18px" color="#878e99">
              Passionate developer experienced in building clean and intuitive web applications with ReactJS, dedicated
              to constantly expanding skills and collaborating effectively with creative teams.
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
              the process of turning ideas into reality using creative solutions. I mainly use ReactJS. I’m always
              curious about learning new skills, tools, and concepts.
            </Text>
            <Text fontSize="18px" color="#878e99">
              In addition to working on various solo hobby projects, I have worked with creative teams, which involves
              daily stand-ups and communications, source control, and project management.
            </Text>
          </ContentContainer>

          <ContentContainer title="Skills">
            <Skills skills={PRIMARY_SKILLS} title="Primary Skills" />
            <Box h="16px" />
            <Skills skills={SECONDARY_SKILLS} title="Secondary Skills" />
          </ContentContainer>

          {isPortfolio && (
            <ContentContainer title="Portfolio">
              <Portfolio />
            </ContentContainer>
          )}

          <ContentContainer title="Recommendations">
            <Testimonials />
          </ContentContainer>

          <ContentContainer title="Contact With Me">
            <ContactForm />
          </ContentContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
