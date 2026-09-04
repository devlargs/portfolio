'use client';

import { FC, useMemo } from 'react';
import { Menu, SettingsIcon } from '../ui';
import styles from './AdminHeader.module.css';

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader: FC<AdminHeaderProps> = ({ onLogout }) => {
  const items = useMemo(() => [{ label: 'Logout', onSelect: onLogout }], [onLogout]);

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Portfolio Admin</h2>
      <Menu label="Settings menu" icon={<SettingsIcon />} items={items} />
    </header>
  );
};

export default AdminHeader;
