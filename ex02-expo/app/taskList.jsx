import { addTask, deleteTask, getTasks, updateTask } from "@/api";
import { CardTask } from "@/components/CardTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button, Input, Text } from "@rneui/themed";

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
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!data) {
    return <Text>No data available</Text>;
  }

  return (
    <View style={styles.container}>
      
      <Text h3 style={styles.headerTitle}>Task List</Text>
      
      <View style={styles.inputRow}>

        <Input
          placeholder="Add a task"
          value={description}
          onChangeText={setDescription}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputStyle}
        />

        <Button
          title="Add"
          onPress={() => addMutation.mutate({ description })}
          containerStyle={styles.buttonContainer}
        />
      </View>

      <View style={styles.separator} />

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

      {isPending && <Text>Pending...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
    },
    headerTitle: {
        marginBottom: 10,
    },
    inputRow: { 
        flexDirection: "row", 
        alignItems: 'flex-end', 
        marginBottom: 10 
    },
    inputContainer: { 
        flex: 1, 
        height: 40,
        paddingHorizontal: 0, 
        marginHorizontal: 0,
    },
    inputStyle: {
        fontSize: 16
    },
    buttonContainer: {
        width: 80,
        height: 40,
        marginLeft: 10,
    },
    separator: {
        marginVertical: 5,
        backgroundColor: "grey",
        width: "100%",
        height: 1, 
        alignSelf: "center",
    },
});
