import { useToast } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Contact } from '../types';

interface UseContactsResult {
  contacts: Contact[];
  loading: boolean;
  removeContact: (id: string) => Promise<boolean>;
}

const useContacts = (): UseContactsResult => {
  const toast = useToast();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchContacts = async (): Promise<void> => {
      try {
        const res = await fetch('/api/contacts');
        const data = await res.json();
        if (cancelled) return;
        if (data.error) {
          toast({ title: 'Error fetching contacts', description: data.error, status: 'error', position: 'bottom' });
          return;
        }
        setContacts(data.data || []);
      } catch {
        if (!cancelled) toast({ title: 'Error fetching contacts', status: 'error', position: 'bottom' });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchContacts();
    return (): void => {
      cancelled = true;
    };
  }, [toast]);

  const removeContact = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const res = await fetch(`/api/contacts?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.error) {
          toast({ title: 'Error removing contact', description: data.error, status: 'error', position: 'bottom' });
          return false;
        }
        setContacts((prev) => prev.filter((c) => c._id !== id));
        toast({ title: 'Contact removed', status: 'success', position: 'bottom' });
        return true;
      } catch {
        toast({ title: 'Error removing contact', status: 'error', position: 'bottom' });
        return false;
      }
    },
    [toast]
  );

  return { contacts, loading, removeContact };
};

export default useContacts;
