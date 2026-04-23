import Admin from '@components/Admin';
import Head from 'next/head';
import { FC } from 'react';

const AdminPage: FC = () => (
  <>
    <Head>
      <title>Portfolio Admin</title>
    </Head>
    <Admin />
  </>
);

export default AdminPage;
