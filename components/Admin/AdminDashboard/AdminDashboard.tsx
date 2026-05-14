'use client';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import ContactsView from '../ContactsView';
import SettingsView from '../SettingsView';
import { ADMIN_NAV_ITEMS, DEFAULT_ADMIN_SECTION } from '../constants';
import { Section } from '../types';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

interface AdminDashboardProps {
  onLogout: () => void;
}

const SECTION_VIEWS: Record<Section, FC> = {
  contacts: ContactsView,
  settings: SettingsView,
};

const AdminDashboard: FC<AdminDashboardProps> = ({ onLogout }) => {
  const [section, setSection] = useState<Section>(DEFAULT_ADMIN_SECTION);

  const ActiveView = SECTION_VIEWS[section];
  const activeLabel = useMemo(() => ADMIN_NAV_ITEMS.find((item) => item.key === section)?.label ?? '', [section]);

  return (
    <Box minH="100vh">
      <AdminHeader onLogout={onLogout} />
      <Flex>
        <AdminSidebar activeSection={section} onSelect={setSection} />
        <Box flex="1" p={{ base: '20px', md: '32px' }} minW="0">
          <Heading color="white" size="lg" mb="24px">
            {activeLabel}
          </Heading>
          <ActiveView />
        </Box>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
