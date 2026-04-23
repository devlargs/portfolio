import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const Admin = dynamic(() => import('@components/Admin'), { ssr: false });

const AdminPage: FC = () => (
  <>
    <Head>
      <title>Portfolio Admin</title>
    </Head>
    <Admin />
  </>
);

export default AdminPage;
