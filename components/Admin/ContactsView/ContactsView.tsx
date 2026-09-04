'use client';

import { FC, useState } from 'react';
import { Contact } from '../types';
import { DeleteIcon, IconButton, Spinner } from '../ui';
import styles from './ContactsView.module.css';
import DeleteContactDialog from './DeleteContactDialog';
import useContacts from './useContacts';

const ContactsView: FC = () => {
  const { contacts, loading, removeContact } = useContacts();
  const [pendingDelete, setPendingDelete] = useState<Contact | null>(null);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  if (contacts.length === 0) {
    return <p className={styles.empty}>No contacts found.</p>;
  }

  return (
    <>
      <div className={styles.scroller}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th className={styles.actionsHead}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td className={styles.message}>{contact.message}</td>
                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td className={styles.actions}>
                  <IconButton
                    label={`Remove contact from ${contact.name}`}
                    icon={<DeleteIcon />}
                    size="sm"
                    danger
                    onClick={(): void => setPendingDelete(contact)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteContactDialog
        contact={pendingDelete}
        onClose={(): void => setPendingDelete(null)}
        onConfirm={removeContact}
      />
    </>
  );
};

export default ContactsView;
