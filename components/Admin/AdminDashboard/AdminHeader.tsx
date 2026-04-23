import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FC } from 'react';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader: FC<AdminHeaderProps> = ({ onLogout }) => (
  <Flex
    as="header"
    align="center"
    justify="space-between"
    px={{ base: '16px', md: '32px' }}
    py="14px"
    bg="#1a1c1f"
    borderBottom="1px solid #2b2d31"
  >
    <Heading color="white" size="md">
      Portfolio Admin
    </Heading>
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        icon={<SettingsIcon />}
        aria-label="Settings menu"
        variant="ghost"
        color="white"
        _hover={{ bg: '#2b2d31' }}
        _active={{ bg: '#2b2d31' }}
      />
      <MenuList bg="#1a1c1f" borderColor="#2b2d31">
        <MenuItem bg="#1a1c1f" color="white" _hover={{ bg: '#2b2d31' }} _focus={{ bg: '#2b2d31' }} onClick={onLogout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  </Flex>
);

export default AdminHeader;
