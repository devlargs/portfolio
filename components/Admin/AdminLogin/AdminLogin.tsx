import { Box, Button, Container, Flex, Heading, Input, useToast, VStack } from '@chakra-ui/react';
import { FC, FormEvent, useState } from 'react';

interface AdminLoginProps {
  onSubmit: (username: string, password: string) => boolean;
}

const AdminLogin: FC<AdminLoginProps> = ({ onSubmit }) => {
  const toast = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const success = onSubmit(username, password);
    if (!success) {
      toast({ title: 'Invalid credentials', status: 'error', position: 'bottom' });
      setPassword('');
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" px="16px">
      <Container maxW="md">
        <VStack spacing={6} align="stretch">
          <Heading color="white" size="lg" textAlign="center">
            Portfolio Admin
          </Heading>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e): void => setUsername(e.target.value)}
                bg="#2b2d31"
                color="white"
                borderColor="#3d3f43"
                _hover={{ borderColor: '#4a4c50' }}
                _focus={{ borderColor: '#5a5c60' }}
              />
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
                Sign In
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
};

export default AdminLogin;
