import React, { useState } from 'react';
import { View, Input, IconButton } from 'native-base';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

const AdicionarTarefa: React.FC = () => {
  const [novaTarefa, setNovaTarefa] = useState('');
  const { adicionarTarefa } = useEstadoGlobal();

  const handleAdicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      adicionarTarefa(novaTarefa);
      setNovaTarefa('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Digite uma tarefa"
          placeholderTextColor="#888"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          fontSize={18}
          color="#000"
          style={styles.input}
        />
        <IconButton
          icon={<Ionicons name="add" size={24} color="#fff" />}
          onPress={handleAdicionarTarefa}
          style={styles.addButton}
        />
      </View>
    </View>
  );
};

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
    borderRadius: 10,
    marginLeft: 10,
    padding: 10,
  },
});

export default AdicionarTarefa;
