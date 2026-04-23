import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Contact } from '../types';

interface UseContactsResult {
  contacts: Contact[];
  loading: boolean;
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

    fetchContacts();
    return (): void => {
      cancelled = true;
    };
  }, [toast]);

  return { contacts, loading };
};

export default useContacts;
