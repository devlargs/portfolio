import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { COMPANY_CONTRIBUTIONS, PERSONAL_PROJECTS } from '@constants/portfolio';
import openNewTab from '@utils/openNewTab';
import { FC, useState } from 'react';
import defaults from 'theme/defaults';

const Portfolio: FC = () => {
  const [hovered, setHovered] = useState('');

  return (
    <Box pt="16px">
      <Text fontSize="14px" fontWeight={300} color="#c4cfde" letterSpacing="3px" textTransform="uppercase">
        Company Contributions
      </Text>
      <UnorderedList fontSize="16px" lineHeight="28px" color="#878e99">
        {COMPANY_CONTRIBUTIONS.map((item) => (
          <ListItem
            cursor="pointer"
            key={item.title}
            _hover={{ color: defaults.primary }}
            transition="0.5s ease-in-out"
            onMouseLeave={(): void => setHovered('')}
            onMouseEnter={(): void => setHovered(item.title)}
            onClick={(): void => openNewTab(item.link)}
          >
            {item.title} {hovered === item.title ? <ArrowForwardIcon transition="0.5 ease-in-out" /> : null}
          </ListItem>
        ))}
      </UnorderedList>

      <Text fontSize="14px" fontWeight={300} color="#c4cfde" letterSpacing="3px" textTransform="uppercase" mt="16px">
        Personal Projects
      </Text>
      <UnorderedList fontSize="16px" lineHeight="28px" color="#878e99">
        {PERSONAL_PROJECTS.map((item) => (
          <ListItem
            cursor="pointer"
            key={item.title}
            _hover={{ color: defaults.primary }}
            transition="0.5s ease-in-out"
            onMouseLeave={(): void => setHovered('')}
            onMouseEnter={(): void => setHovered(item.title)}
            onClick={(): void => openNewTab(item.link)}
          >
            {item.title} {hovered === item.title ? <ArrowForwardIcon transition="0.5 ease-in-out" /> : null}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default Portfolio;
