import { useCallback, useEffect, useState } from 'react';
import { ADMIN_AUTH_STORAGE_KEY } from '../constants';

interface UseAdminAuthResult {
  authed: boolean | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const useAdminAuth = (): UseAdminAuthResult => {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === '1');
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    const validUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (username === validUser && password === validPass) {
      sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, '1');
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback((): void => {
    sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    setAuthed(false);
  }, []);

  return { authed, login, logout };
};

export default useAdminAuth;
