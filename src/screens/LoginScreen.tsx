import AsyncStorage from '@react-native-community/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
        return;
      }

      const data = await response.json();
      const token = data.token;

      await AsyncStorage.setItem('token', token);

      setErrorMessage(null);
      navigation.navigate('Home');
    } catch (error) {
      setErrorMessage('Erro de conexão. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Entre para continuar</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="#0096FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#0096FF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Não tem uma conta?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('Register')}>
          Registre-se
        </Text>
      </Text>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  error: {
    color: '#D9534F',
    textAlign: 'center',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    elevation: 1, // Add shadow for modern look
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#0096FF',
    fontWeight: '600',
    marginBottom: 24,
  },
  loginButton: {
    width: '100%',
    maxWidth: 360,
    height: 50,
    backgroundColor: '#0096FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#0096FF',
    fontWeight: '600',
  },
});

export default LoginScreen;
