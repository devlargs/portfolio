'use client';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FC, useRef, useState } from 'react';
import { Contact } from '../types';

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
    <AlertDialog isOpen={contact !== null} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent bg="#1a1c1f" color="white">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remove contact
          </AlertDialogHeader>
          <AlertDialogBody color="#c4cfde">
            Are you sure you want to remove <b>{contact?.name}</b>? This action cannot be undone.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="ghost" color="white" _hover={{ bg: '#2b2d31' }}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirm} ml={3} isLoading={submitting}>
              Remove
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteContactDialog;
