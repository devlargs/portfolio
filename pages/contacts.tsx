import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  useToast,
  VStack,
  Heading,
  Container,
} from '@chakra-ui/react';
import Head from 'next/head';
import { FC, useState, useEffect } from 'react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const ContactsPage: FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (password === 'hehehe') {
      setIsAuthenticated(true);
    } else {
      toast({
        title: 'Incorrect password',
        status: 'error',
        position: 'bottom',
      });
      setPassword('');
    }
  };

  const fetchContacts = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contacts?password=hehehe`);
      const data = await res.json();

      if (data.error) {
        toast({
          title: 'Error fetching contacts',
          description: data.error,
          status: 'error',
          position: 'bottom',
        });
      } else {
        setContacts(data.data || []);
      }
    } catch (error) {
      toast({
        title: 'Error fetching contacts',
        status: 'error',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Contacts - Password Required</title>
        </Head>
        <Container maxW="md" mt="100px">
          <VStack spacing={4}>
            <Heading color="white" size="lg">
              Enter Password
            </Heading>
            <Box as="form" onSubmit={handlePasswordSubmit} w="100%">
              <VStack spacing={4}>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e): void => setPassword(e.target.value)}
                  bg="#2b2d31"
                  color="white"
                  borderColor="#3d3f43"
                  _hover={{ borderColor: '#4a4c50' }}
                  _focus={{ borderColor: '#5a5c60' }}
                />
                <Button type="submit" colorScheme="blue" w="100%">
                  Submit
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Contacts</title>
      </Head>
      <Container maxW="container.xl" py="60px" px={{ base: '16px', lg: '100px' }}>
        <VStack spacing={6} align="stretch">
          <Heading color="white" size="xl">
            Contacts
          </Heading>

          {loading ? (
            <Text color="#878e99">Loading contacts...</Text>
          ) : contacts.length === 0 ? (
            <Text color="#878e99">No contacts found.</Text>
          ) : (
            <TableContainer>
              <Table variant="simple" colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th color="white">Name</Th>
                    <Th color="white">Email</Th>
                    <Th color="white">Message</Th>
                    <Th color="white">Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {contacts.map((contact) => (
                    <Tr key={contact._id}>
                      <Td color="#878e99">{contact.name}</Td>
                      <Td color="#878e99">{contact.email}</Td>
                      <Td color="#878e99" maxW="400px" wordBreak="break-word">
                        {contact.message}
                      </Td>
                      <Td color="#878e99">{new Date(contact.createdAt).toLocaleDateString()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default ContactsPage;
