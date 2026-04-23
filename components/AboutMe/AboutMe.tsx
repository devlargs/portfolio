import { Box, chakra, Text } from '@chakra-ui/react';
import { FC } from 'react';
import defaults from 'theme/defaults';
import TechChip from './TechChip';

const TECH_STACK = ['ReactJS', 'Next.js', 'NodeJS', 'TypeScript', 'MongoDB'];

const Highlight = chakra('span', {
  baseStyle: { color: defaults.primary, fontWeight: 600 },
});

const AboutMe: FC = () => (
  <Box>
    <Box position="relative" pl={{ base: '16px', md: '20px' }} borderLeft={`2px solid ${defaults.primary}`} mb="20px">
      <Text fontSize="18px" color="#c4cfde" lineHeight="1.7">
        I&rsquo;m a developer with a passion for building <Highlight>clean web applications</Highlight> that feel
        intuitive to use. I enjoy turning ideas into reality through thoughtful, creative solutions, and I&rsquo;m
        always curious to explore new tools and ideas along the way.
      </Text>
    </Box>

    <Text fontSize="16px" color="#878e99" lineHeight="1.8" mb="24px">
      Beyond solo hobby projects, I&rsquo;ve collaborated with creative teams through daily stand-ups, code reviews, and
      shared project management, shipping work that balances craft with pragmatism.
    </Text>

    <Box display="flex" flexWrap="wrap" gap="8px">
      {TECH_STACK.map((t) => (
        <TechChip key={t} label={t} />
      ))}
    </Box>
  </Box>
);

export default AboutMe;
