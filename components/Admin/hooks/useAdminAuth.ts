import { useCallback, useEffect, useState } from 'react';
import { ADMIN_AUTH_STORAGE_KEY } from '../constants';

interface UseAdminAuthResult {
  authed: boolean | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const readAuthed = (): boolean => {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const writeAuthed = (value: boolean): void => {
  try {
    if (value) sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, '1');
    else sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  } catch {}
};

const useAdminAuth = (): UseAdminAuthResult => {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(readAuthed());
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    const validUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (!validUser || !validPass) return false;
    if (username === validUser && password === validPass) {
      writeAuthed(true);
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback((): void => {
    writeAuthed(false);
    setAuthed(false);
  }, []);

  return { authed, login, logout };
};

export default useAdminAuth;
