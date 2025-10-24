
import { Card, Checkbox, IconButton, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export function CardTask({ task, onDelete, onCheck }) {
  const handleCheck = () => {
    onCheck(task); 
  };

  const handleDelete = () => {
    onDelete(task.objectId); 

  return (
    
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        
        <Checkbox
          status={task.done ? 'checked' : 'unchecked'}
          onPress={handleCheck}
        />
       
        <Text
          variant="bodyLarge"
          style={[styles.description, task.done && styles.descriptionDone]}
        >
          {task.description}
        </Text>
        
        <IconButton
          icon="delete" 
          iconColor="red"
          size={20}
          onPress={handleDelete}
        />
      </Card.Content>
    </Card>
  );
}


const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        marginHorizontal: 10,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    description: {
        flex: 1, 
        marginLeft: 10, 
        marginRight: 10,
    },
    descriptionDone: {
        textDecorationLine: 'line-through',
        color: 'grey',
    }
})};