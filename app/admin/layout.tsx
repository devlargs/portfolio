import type { Metadata } from 'next';
import { FC, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Portfolio Admin',
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default AdminLayout;
