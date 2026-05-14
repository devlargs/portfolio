'use client';

import { FC } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import useAdminAuth from './hooks/useAdminAuth';

const Admin: FC = () => {
  const { authed, login, logout } = useAdminAuth();

  if (authed === null) return null;
  if (!authed) return <AdminLogin onSubmit={login} />;
  return <AdminDashboard onLogout={logout} />;
};

export default Admin;
