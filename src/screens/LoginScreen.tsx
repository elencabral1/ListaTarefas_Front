import React, { useState } from 'react';
import { Box, VStack, Text, Center } from 'native-base';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const LoginScreen: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Lógica de login aqui
        console.log("Usuário:", username);
        console.log("Senha:", password);
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
