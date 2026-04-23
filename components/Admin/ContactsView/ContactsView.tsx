import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Contact } from '../types';
import DeleteContactDialog from './DeleteContactDialog';
import useContacts from './useContacts';

const ContactsView: FC = () => {
  const { contacts, loading, removeContact } = useContacts();
  const [pendingDelete, setPendingDelete] = useState<Contact | null>(null);

  if (loading) {
    return (
      <Flex justify="center" py="40px">
        <Spinner color="blue.400" />
      </Flex>
    );
  }

  if (contacts.length === 0) {
    return <Text color="#878e99">No contacts found.</Text>;
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th color="white">Name</Th>
              <Th color="white">Email</Th>
              <Th color="white">Message</Th>
              <Th color="white">Date</Th>
              <Th color="white" width="60px" textAlign="right">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {contacts.map((contact) => (
              <Tr key={contact._id}>
                <Td color="#878e99">{contact.name}</Td>
                <Td color="#878e99">{contact.email}</Td>
                <Td color="#878e99" maxW="400px" whiteSpace="normal" wordBreak="break-word">
                  {contact.message}
                </Td>
                <Td color="#878e99">{new Date(contact.createdAt).toLocaleDateString()}</Td>
                <Td textAlign="right">
                  <IconButton
                    aria-label={`Remove contact from ${contact.name}`}
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={(): void => setPendingDelete(contact)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <DeleteContactDialog
        contact={pendingDelete}
        onClose={(): void => setPendingDelete(null)}
        onConfirm={removeContact}
      />
    </>
  );
};

export default ContactsView;
