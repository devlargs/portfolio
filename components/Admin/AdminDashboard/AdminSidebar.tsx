import { Box, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import defaults from 'theme/defaults';
import { ADMIN_NAV_ITEMS } from '../constants';
import { Section } from '../types';

interface AdminSidebarProps {
  activeSection: Section;
  onSelect: (section: Section) => void;
}

const AdminSidebar: FC<AdminSidebarProps> = ({ activeSection, onSelect }) => (
  <Box
    as="aside"
    w={{ base: '180px', md: '220px' }}
    minH="calc(100vh - 60px)"
    bg="#1a1c1f"
    borderRight="1px solid #2b2d31"
    py="20px"
  >
    <VStack spacing="4px" align="stretch">
      {ADMIN_NAV_ITEMS.map((item) => {
        const active = activeSection === item.key;
        return (
          <Box
            key={item.key}
            as="button"
            textAlign="left"
            px="20px"
            py="10px"
            color={active ? 'white' : '#878e99'}
            bg={active ? '#2b2d31' : 'transparent'}
            borderLeft={active ? `3px solid ${defaults.primary}` : '3px solid transparent'}
            fontSize="14px"
            fontWeight={active ? 'bold' : 'normal'}
            _hover={{ bg: '#2b2d31', color: 'white' }}
            onClick={(): void => onSelect(item.key)}
          >
            {item.label}
          </Box>
        );
      })}
    </VStack>
  </Box>
);

export default AdminSidebar;
