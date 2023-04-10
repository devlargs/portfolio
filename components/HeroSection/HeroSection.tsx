import { Box, chakra, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import defaults from 'theme/defaults';

const HeroSection: FC = () => {
  return (
    <Box
      display="grid"
      placeContent="center"
      h="100vh"
      p={{
        base: '60px',
        lg: '80px',
      }}
    >
      <Box>
        <Box
          h="180px"
          w="180px"
          m={{
            base: 'auto',
            lg: 'inherit',
          }}
        >
          <Image
            src="/images/ralph.jpg"
            width={3968}
            height={4016}
            alt="Logo"
            style={{ borderRadius: '50%', border: `5px solid #32363b` }}
          />
        </Box>
        <Box
          h="20px"
          display={{
            base: 'block',
            lg: 'none',
          }}
        />
        <Text
          fontSize={{
            base: '28px',
            lg: '60px',
          }}
          lineHeight={{
            base: '32px',
            lg: '62px',
          }}
          mb="8px"
          fontWeight="bold"
          as="h1"
        >
          Hi, I'm <chakra.span color={defaults.primary}>Ralph Largo</chakra.span>
        </Text>
        <Text
          fontSize={{
            base: '24px',
            lg: '48px',
          }}
          as="h1"
          fontWeight="bold"
        >
          React JS Developer.
        </Text>
        <Text
          fontSize={{
            base: '16px',
            lg: '18px',
          }}
          color="#878e99"
        >
          Passionate developer experienced in building clean and intuitive web applications with ReactJS, dedicated to
          constantly expanding skills and collaborating effectively with creative teams.
        </Text>
      </Box>
    </Box>
  );
};

export default HeroSection;
