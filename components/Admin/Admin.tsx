'use client';

import { FC } from 'react';
import './adminTokens.css';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
import styles from './Admin.module.css';
import useAdminAuth from './hooks/useAdminAuth';
import { ToastProvider } from './ui';

/**
 * Rendered while the session is still being read, and left on screen if the
 * client bundle never runs at all. Returning `null` here instead meant /admin
 * prerendered to an empty document, so any hydration failure showed the reader
 * a blank white page with nothing to distinguish it from a broken deploy.
 */
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
