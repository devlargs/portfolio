import { Section, NavItem } from './types';

export const ADMIN_AUTH_STORAGE_KEY = 'portfolio_admin_authed';

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { key: 'contacts', label: 'Contacts' },
  { key: 'settings', label: 'Settings' },
];

export const DEFAULT_ADMIN_SECTION: Section = 'contacts';
