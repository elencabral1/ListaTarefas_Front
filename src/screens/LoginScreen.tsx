import React, { useState } from 'react';
import { Box, VStack, Text, Center } from 'native-base';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Defina o tipo das rotas
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

// Defina o tipo das props do LoginScreen
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
      console.log('Tentando login com:', { username, password }); // Log para depuração

      try {
          const response = await fetch('http://localhost:3000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });

          console.log('Resposta do servidor:', response); // Log da resposta do servidor

          if (!response.ok) {
              throw new Error('Login falhou');
          }

          const data = await response.json();
          console.log('Login bem-sucedido:', data);
          // Navegue para a próxima tela, se o login for bem-sucedido
          navigation.navigate('Home');
      } catch (error) {
          console.error('Erro ao fazer login:', error);
          alert('Falha no login, por favor, tente novamente.');
      }
  };

  return (
      <Center flex={1} bg="gray.100">
          <Box safeArea p="4" py="8" w="90%" maxW="290">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500" textAlign="center" mb="4">
                  Bem-vindo(a) ao App
              </Text>
              <VStack space={4}>
                  <CustomInput
                      placeholder="Nome de usuário"
                      value={username}
                      onChangeText={setUsername}
                  />
                  <CustomInput
                      placeholder="Senha"
                      type="password"
                      value={password}
                      onChangeText={setPassword}
                  />
                  <CustomButton onPress={handleLogin}>
                      Entrar
                  </CustomButton>
              </VStack>
          </Box>
      </Center>
  );
};

export default LoginScreen;
