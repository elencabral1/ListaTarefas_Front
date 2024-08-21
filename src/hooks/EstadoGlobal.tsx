import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Interface que define a estrutura de uma tarefa
interface Tarefa {
  id: number;
  tarefa: string;
}

// Interface que define o contexto global de estado
interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (tarefa: string) => void;
  editarTarefa: (id: number, novoTitulo: string) => void;
  excluirTarefa: (id: number) => void;
  registrar: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  recuperarSenha: (email: string) => Promise<void>;
  isAuthenticated: boolean;
}

// Cria o contexto global de estado
const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  tarefas: [],
  adicionarTarefa: () => { },
  editarTarefa: () => { },
  excluirTarefa: () => { },
  registrar: async () => {},
  login: async () => {},
  logout: () => {},
  recuperarSenha: async () => {},
  isAuthenticated: false,
});

// Hook para acessar o contexto global de estado
export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

// Componente que fornece o contexto global de estado para seus filhos
export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Define o estado inicial das tarefas e autenticação
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para carregar as tarefas do backend
  const carregarTarefas = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/tarefas', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Não foi possível carregar as tarefas');
      }

      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = async (tarefa: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tarefa: tarefa }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível adicionar a tarefa');
      }

      const data = await response.json();
      setTarefas([...tarefas, data]);

    } catch (error) {
      console.error('Erro ao adicionar a tarefa:', error);
    }
  };

  // Função para editar o título de uma tarefa
  const editarTarefa = async (id: number, novoTitulo: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tarefa: novoTitulo }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível editar a tarefa');
      }

      const novasTarefas = tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, tarefa: novoTitulo } : tarefa
      );
      setTarefas(novasTarefas);

    } catch (error) {
      console.error('Erro ao editar a tarefa:', error);
    }
  };

  // Função para excluir uma tarefa
  const excluirTarefa = async (id: number) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Não foi possível excluir a tarefa');
      }

      const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
      setTarefas(novasTarefas);

    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  // Função para registrar um novo usuário
  const registrar = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role: 'user' }), // Supondo que o role seja 'user'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  };

  // Função para autenticar o usuário (login)
  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { token } = await response.json();
      await AsyncStorage.setItem('token', token);
      setIsAuthenticated(true);
      carregarTarefas(); // Carregar as tarefas após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  // Função para fazer logout
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
    setTarefas([]); // Limpa as tarefas ao fazer logout
  };

  // Função para recuperar senha
  const recuperarSenha = async (email: string) => {
    try {
      const response = await fetch('http://localhost:3000/recuperar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      alert('Instruções de recuperação de senha enviadas para o e-mail cadastrado.');
    } catch (error) {
      console.error('Erro ao solicitar a recuperação de senha:', error);
      throw error;
    }
  };

  // Verifica o token no AsyncStorage na inicialização e autentica o usuário automaticamente
  useEffect(() => {
    const verificarAutenticacao = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        carregarTarefas();
      }
    };

    verificarAutenticacao();
  }, []);

  // Retorna o contexto global de estado com as funções para manipular as tarefas e autenticação
  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa, registrar, login, logout, recuperarSenha, isAuthenticated }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};
