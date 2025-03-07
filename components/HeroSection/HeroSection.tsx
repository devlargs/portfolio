import { Box, chakra, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import defaults from 'theme/defaults';

const HeroSection: FC<{
  logoPlaceholder: string;
}> = ({ logoPlaceholder }) => {
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
            src="/images/linkedin/ralph.jpg"
            width={3968}
            height={4016}
            alt="Logo"
            style={{ borderRadius: '50%', border: `5px solid #32363b` }}
            placeholder="blur"
            blurDataURL={logoPlaceholder}
          />
        </Box>
        <Box h="20px" />
        <Text
          fontSize={{
            base: '26px',
            lg: '60px',
          }}
          lineHeight={{
            base: '30px',
            lg: '62px',
          }}
          mb="8px"
          fontWeight="bold"
          as="h1"
          textAlign={{
            base: 'center',
            lg: 'left',
          }}
        >
          Hi, I'm <chakra.span color={defaults.primary}>Ralph Largo</chakra.span>
        </Text>
        <Text
          fontSize={{
            base: '22px',
            lg: '48px',
          }}
          as="h1"
          fontWeight="bold"
          textAlign={{
            base: 'center',
            lg: 'left',
          }}
        >
          Full Stack Web Developer
        </Text>
        <Text
          fontSize={{
            base: '16px',
            lg: '18px',
          }}
          color="#878e99"
          textAlign={{
            base: 'center',
            lg: 'left',
          }}
        >
          Passionate developer experienced in building clean and intuitive web applications, dedicated to constantly
          expanding skills and collaborating effectively with creative teams.
        </Text>
      </Box>
    </Box>
  );
};

export default HeroSection;
