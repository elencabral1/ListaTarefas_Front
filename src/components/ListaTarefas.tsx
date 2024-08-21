import React from 'react';
import { FlatList, Text, Box, IconButton, Input } from 'native-base';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

interface TarefaItemProps {
  id: number;
  tarefa: string;
}

const TarefaItem: React.FC<TarefaItemProps> = ({ id, tarefa }) => {
  const { editarTarefa, excluirTarefa } = useEstadoGlobal();
  const [editando, setEditando] = React.useState(false);
  const [novoTitulo, setNovoTitulo] = React.useState(tarefa);

  const handleEditar = () => {
    if (editando) {
      editarTarefa(id, novoTitulo);
    }
    setEditando(!editando);
  };

  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" style={styles.taskItem}>
      {editando ? (
        <Input flex={3} value={novoTitulo} onChangeText={setNovoTitulo} fontSize={18} />
      ) : (
        <Text flex={3} fontSize={18}>{tarefa}</Text>
      )}

      <IconButton
        icon={<Ionicons name={editando ? "checkmark" : "pencil"} size={14} color="#fff" />}
        onPress={handleEditar}
        style={styles.editButton}
      />

      <IconButton
        icon={<Ionicons name="trash" size={14} color="#fff" />}
        onPress={() => excluirTarefa(id)}
        style={styles.deleteButton}
      />
    </Box>
  );
};

const ListaTarefas: React.FC = () => {
  const { tarefas } = useEstadoGlobal();

  return (
    <FlatList
      data={tarefas}
      renderItem={({ item }) => <TarefaItem id={item.id} tarefa={item.tarefa} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ width: '100%' }}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  editButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 10,
    marginLeft: 10,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 10,
    marginLeft: 10,
    padding: 10,
  },
});

export default ListaTarefas;
