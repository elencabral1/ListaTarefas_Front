import React from 'react';
import { FlatList, Text, Box, IconButton, Input } from 'native-base';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEstadoGlobal } from '../hooks/EstadoGlobal';

// Define a interface para as propriedades de um item de tarefa
interface TarefaItemProps {
  id: number;
  tarefa: string;
}

// Componente para exibir um item de tarefa
const TarefaItem: React.FC<TarefaItemProps> = ({ id, tarefa }) => {
  // Usa o hook de estado global para acessar funções de edição e exclusão de tarefas
  const { editarTarefa, excluirTarefa } = useEstadoGlobal();
  // Estado local para controlar se o item está em modo de edição
  const [editando, setEditando] = React.useState(false);
  // Estado local para armazenar o novo título da tarefa
  const [novoTitulo, setNovoTitulo] = React.useState(tarefa);

  // Função para alternar o modo de edição e salvar mudanças
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
