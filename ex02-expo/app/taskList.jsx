import { addTask, deleteTask, getTasks, updateTask } from "@/api";
import { CardTask } from "@/components/CardTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { FlatList, View, StyleSheet } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Divider } from "react-native-paper"; // Adicionar Paper

export default function TaskList() {
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getTasks,
  });

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setDescription("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isFetching) {
    
    return <ActivityIndicator animating={true} size="large" style={styles.centered} />;
  }
  if (error) {
    return <Text style={styles.centered}>Error: {error.message}</Text>;
  }
  if (!data) {
    return <Text style={styles.centered}>No data available</Text>;
  }
  return (
    <View style={styles.container}>
      
      <Text variant="headlineMedium" style={styles.title}>Task List</Text>
      <View style={styles.inputContainer}>
       
        <TextInput
          label="Add a task"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          mode="outlined"
        />
        
        <Button
          mode="contained"
          onPress={() => addMutation.mutate({ description })}
          disabled={addMutation.isLoading} 
          style={styles.addButton}
        >
          Add
        </Button>
      </View>
    
      <Divider style={styles.divider} />
      <FlatList
        data={data.results}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item: task }) => (
          <CardTask
            key={task.objectId}
            task={task}
            onDelete={deleteMutation.mutate}
            onCheck={updateMutation.mutate}
          />
        )}
      />
      
      {isPending && <ActivityIndicator animating={true} style={{marginTop: 10}} />}
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: 15,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
    },
    addButton: {
        justifyContent: 'center', 
    },
    divider: {
        marginVertical: 15,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});