import { useCallback, useEffect, useState } from 'react';
import { ADMIN_AUTH_STORAGE_KEY } from '../constants';

interface UseAdminAuthResult {
  authed: boolean | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

/**
 * `sessionStorage` is not always reachable: a browser set to block site data,
 * a hardened private window, or an embedded context all throw a SecurityError
 * on plain property access. Unguarded, that throw escapes the mount effect and
 * React unmounts the tree, which renders /admin as a blank white page with no
 * console error the reader would recognise. Treat an unreachable store as
 * "signed out" instead.
 */
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
  } catch {
    /* The session simply will not survive a reload. Sign-in still works for
       this page view, which is better than failing the interaction outright. */
  }
};

const useAdminAuth = (): UseAdminAuthResult => {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(readAuthed());
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    const validUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    /* Unset env vars would otherwise make `undefined === undefined` a valid
       sign-in for two empty fields. */
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
