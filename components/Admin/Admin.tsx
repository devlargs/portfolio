'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { FC } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import useAdminAuth from './hooks/useAdminAuth';

/**
 * Rendered while the session is still being read, and left on screen if the
 * client bundle never runs at all. Returning `null` here instead meant /admin
 * prerendered to an empty document, so any hydration failure showed the reader
 * a blank white page with nothing to distinguish it from a broken deploy.
 */
const AdminShell: FC = () => (
  <Box minH="100vh" bg="#111316" display="grid" placeItems="center" p="24px">
    <Box textAlign="center">
      <Heading color="white" size="md" mb="8px">
        Portfolio Admin
      </Heading>
      <Text color="#878e99" fontSize="14px">
        Checking your session.
      </Text>
    </Box>
  </Box>
);

const Admin: FC = () => {
  const { authed, login, logout } = useAdminAuth();

  if (authed === null) return <AdminShell />;
  if (!authed) return <AdminLogin onSubmit={login} />;
  return <AdminDashboard onLogout={logout} />;
};

export default Admin;
