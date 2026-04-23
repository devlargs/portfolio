import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Text } from '@chakra-ui/react';
import openNewTab from '@utils/openNewTab';
import { FC } from 'react';
import defaults from 'theme/defaults';

interface Props {
  title: string;
  link: string;
}

const getHostname = (url: string): string => {
  try {
    return new URL(url.trim()).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const ProjectCard: FC<Props> = ({ title, link }) => (
  <Box
    as="button"
    type="button"
    onClick={(): void => openNewTab(link.trim())}
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    justifyContent="space-between"
    textAlign="left"
    gap="6px"
    p="14px 16px"
    bg="rgba(255,255,255,0.02)"
    border="1px solid rgba(196,207,222,0.08)"
    borderRadius="10px"
    cursor="pointer"
    transition="transform 220ms ease, border-color 220ms ease, background 220ms ease, box-shadow 220ms ease"
    _hover={{
      transform: 'translateY(-2px)',
      borderColor: 'rgba(50,171,255,0.45)',
      bg: 'rgba(50,171,255,0.04)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.25), 0 0 14px rgba(50,171,255,0.12)',
      '& .project-arrow': { opacity: 1, transform: 'translate(2px, -2px)' },
      '& .project-title': { color: defaults.primary },
    }}
    w="100%"
  >
    <Box display="flex" alignItems="center" justifyContent="space-between" w="100%" gap="8px">
      <Text
        className="project-title"
        fontSize="14px"
        fontWeight={600}
        color="#c4cfde"
        transition="color 220ms ease"
        noOfLines={1}
      >
        {title}
      </Text>
      <ExternalLinkIcon
        className="project-arrow"
        boxSize="14px"
        color={defaults.primary}
        opacity={0.5}
        transition="all 220ms ease"
        flexShrink={0}
      />
    </Box>
    <Text fontSize="11px" color="#6b727c" letterSpacing="0.3px" noOfLines={1} w="100%">
      {getHostname(link)}
    </Text>
  </Box>
);

export default ProjectCard;
