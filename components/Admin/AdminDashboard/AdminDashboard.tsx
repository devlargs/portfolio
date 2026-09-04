'use client';

import { FC, useMemo, useState } from 'react';
import { ADMIN_NAV_ITEMS, DEFAULT_ADMIN_SECTION } from '../constants';
import ContactsView from '../ContactsView';
import SettingsView from '../SettingsView';
import { Section } from '../types';
import styles from './AdminDashboard.module.css';
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
    <div className={styles.page}>
      <AdminHeader onLogout={onLogout} />
      <div className={styles.split}>
        <AdminSidebar activeSection={section} onSelect={setSection} />
        <div className={styles.main}>
          <h2 className={styles.heading}>{activeLabel}</h2>
          <ActiveView />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
