'use client';

import { FC } from 'react';
import './adminTokens.css';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import styles from './Admin.module.css';
import useAdminAuth from './hooks/useAdminAuth';
import { ToastProvider } from './ui';

const AdminShell: FC = () => (
  <div className={styles.shell}>
    <div className={styles.card}>
      <h2 className={styles.title}>Portfolio Admin</h2>
      <p className={styles.note}>Checking your session.</p>
    </div>
  </div>
);

const Admin: FC = () => {
  const { authed, login, logout } = useAdminAuth();

  return (
    <ToastProvider>
      {authed === null && <AdminShell />}
      {authed === false && <AdminLogin onSubmit={login} />}
      {authed === true && <AdminDashboard onLogout={logout} />}
    </ToastProvider>
  );
};

export default Admin;
