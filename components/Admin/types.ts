export type Section = 'contacts' | 'settings';

export interface NavItem {
  key: Section;
  label: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
