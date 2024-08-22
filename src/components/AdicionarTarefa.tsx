import React, { useState } from 'react'; // importa o react e o hook useState
import { View, Input, IconButton } from 'native-base'; // importa componentes do native-base
import { StyleSheet } from 'react-native'; // importa stylesheet para estilização
import { Ionicons } from '@expo/vector-icons'; // importa ícones do expo
import { useEstadoGlobal } from '../hooks/EstadoGlobal'; // importa um hook customizado para estado global

// componente funcional adicionar tarefa
const AdicionarTarefa: React.FC = () => {
  // estado local para armazenar a nova tarefa
  const [novaTarefa, setNovaTarefa] = useState('');
  
  // desestruturação do hook customizado para obter a função de adicionar tarefa
  const { adicionarTarefa } = useEstadoGlobal();

  // função para lidar com a adição de uma nova tarefa
  const handleAdicionarTarefa = () => {
    // verifica se o campo da tarefa não está vazio
    if (novaTarefa.trim() !== '') {
      // adiciona a nova tarefa e limpa o campo de entrada
      adicionarTarefa(novaTarefa);
      setNovaTarefa('');
    }
  };

  return (
    <View style={styles.container}>
      {/* contêiner para o campo de entrada e botão de adição */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="digite uma tarefa" 
          placeholderTextColor="#888" 
          value={novaTarefa} 
          onChangeText={setNovaTarefa} 
          fontSize={18} 
          color="#000" 
          style={styles.input} // estilo aplicado ao campo de entrada
        />
        <IconButton
          icon={<Ionicons name="add" size={24} color="#fff" />} // ícone do botão
          onPress={handleAdicionarTarefa} // função a ser chamada ao pressionar o botão
          style={styles.addButton} // estilo aplicado ao botão
        />
      </View>
    </View>
  );
};

// estilos aplicados aos componentes
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7', 
    paddingVertical: 20, 
    paddingHorizontal: 20, 
    width: '100%', 
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%', 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    paddingHorizontal: 10, 
  },
  input: {
    flex: 1, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
  },
  addButton: {
    backgroundColor: '#FF8C00', 
    borderRadius: 20, 
    marginLeft: 10, 
    padding: 10, 
  },
});

// exporta o componente para ser usado em outras partes do aplicativo
export default AdicionarTarefa;
