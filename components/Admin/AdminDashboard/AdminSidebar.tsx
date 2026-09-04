'use client';

import cx from '@utils/cx';
import { FC } from 'react';
import { ADMIN_NAV_ITEMS } from '../constants';
import { Section } from '../types';
import styles from './AdminSidebar.module.css';

interface AdminSidebarProps {
  activeSection: Section;
  onSelect: (section: Section) => void;
}

const AdminSidebar: FC<AdminSidebarProps> = ({ activeSection, onSelect }) => (
  <aside className={styles.sidebar}>
    <div className={styles.list}>
      {ADMIN_NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={cx(styles.item, activeSection === item.key && styles.active)}
          onClick={(): void => onSelect(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  </aside>
);

export default AdminSidebar;
