'use client';

import { FC, FormEvent, useState } from 'react';
import { Button, useToast } from '../ui';
import styles from './AdminLogin.module.css';

interface AdminLoginProps {
  onSubmit: (username: string, password: string) => boolean;
}

const AdminLogin: FC<AdminLoginProps> = ({ onSubmit }) => {
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const success = onSubmit(username, password);
    if (!success) {
      toast({ title: 'Invalid credentials', status: 'error', position: 'bottom' });
      setPassword('');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Portfolio Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <input
              className={styles.input}
              placeholder="Username"
              value={username}
              onChange={(e): void => setUsername(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e): void => setPassword(e.target.value)}
            />
            <Button type="submit" variant="solidBlue" fullWidth>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
