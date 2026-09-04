'use client';

import { FC, useRef, useState } from 'react';
import { Contact } from '../types';
import { AlertDialog, Button } from '../ui';

interface DeleteContactDialogProps {
  contact: Contact | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<boolean>;
}

const DeleteContactDialog: FC<DeleteContactDialogProps> = ({ contact, onClose, onConfirm }) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async (): Promise<void> => {
    if (!contact) return;
    setSubmitting(true);
    const success = await onConfirm(contact._id);
    setSubmitting(false);
    if (success) onClose();
  };

  return (
    <AlertDialog
      isOpen={contact !== null}
      onClose={onClose}
      title="Remove contact"
      initialFocusRef={cancelRef}
      footer={
        <>
          <Button ref={cancelRef} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button variant="solidRed" onClick={handleConfirm} isLoading={submitting}>
            Remove
          </Button>
        </>
      }
    >
      Are you sure you want to remove <b>{contact?.name}</b>? This action cannot be undone.
    </AlertDialog>
  );
};

export default DeleteContactDialog;
