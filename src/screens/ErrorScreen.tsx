import React from 'react';
import { Box, Text, Center } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Error: { message: string };
};

type ErrorScreenProps = {
  route: RouteProp<RootStackParamList, 'Error'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const ErrorScreen: React.FC<ErrorScreenProps> = ({ route, navigation }) => {
  const { message } = route.params;

  return (
    <Center flex={1} bg="#FFCDD2">
      <Box p="6" py="8" w="90%" maxW="300" bg="white" borderRadius="10" shadow="3">
        <Text fontSize="xl" fontWeight="bold" color="red.500" textAlign="center" mb="4">
          Ocorreu um erro
        </Text>
        <Text fontSize="md" color="red.400" textAlign="center" mb="4">
          {message}
        </Text>
        <CustomButton onPress={() => navigation.navigate('Login')} bg="red.500" borderRadius="5">
          Tentar Novamente
        </CustomButton>
      </Box>
    </Center>
  );
};

export default ErrorScreen;
