import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, ScrollView, Pressable, Image as RNImage, View } from "react-native";

import { Provider as PaperProvider, Appbar, Button, Card, Text, TextInput, Avatar } from 'react-native-paper';



import { SectionListExample } from "@/components/SectionListExample";

export default function Index() {
  const router = useRouter();
  const [idade, onChangeIdade] = useState("");
  const [showDetails, setShowDetails] = useState(true);
  const anoNasc = new Date().getFullYear() - parseInt(idade);

  const handleOkPress = () => Alert.alert("Botão OK pressionado");
  const handleCancelPress = () => Alert.alert("Botão Cancel pressionado");
  const handleTaskListPress = () => router.navigate("/taskList");

  return (
    
    <ScrollView contentContainerStyle={styles.containerBase}>
        
        <Text variant="displayMedium" style={styles.titleText}>Olá Turma!</Text>

        <Avatar.Image
          style={styles.avatar}
          size={150} 
          source={require("@/assets/images/avatar.jpg")}
        />

        <Card style={styles.card}>
          <Pressable onPress={() => setShowDetails(!showDetails)}>
           
            <Card.Content>
              <Text variant="bodyMedium" style={styles.descriptionText} numberOfLines={showDetails ? undefined : 1}>
                Este é um App de exemplo da disciplina Programação Web e Mobile do
                Curso de Ciência da Computação da Universidade Católica de Pernambuco
                (semestre 2025.2)
              </Text>
            </Card.Content>
          </Pressable>
        </Card>

        {!isNaN(anoNasc) && <Text variant="bodyLarge" style={{marginTop: 10}}>Você nasceu em {anoNasc}</Text>}

    
        <TextInput
          label="Qual a sua idade?" 
          value={idade}
          onChangeText={onChangeIdade}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined" 
          textAlign="center"
        />

    
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleOkPress} style={styles.button}>
            OK
          </Button>
          <Button mode="contained" onPress={handleCancelPress} style={styles.button}>
            Cancel
          </Button>
        </View>

        <Button
          mode="contained" // Estilo do botão
          onPress={handleTaskListPress}
          style={styles.taskListButton}
        >
          Ir para Lista de Tarefas
        </Button>

        {/* Espaçamento pode ser feito com margens ou um <View> vazio */}
        <View style={{ height: 70 }} />
    </ScrollView>
  );
}

// Manter ou adaptar os estilos
const styles = StyleSheet.create({
  containerBase: {
    backgroundColor: "#FFFACD",
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
   titleText: {
     fontWeight: 'bold',
     marginBottom: 20,
     textAlign: 'center'
   },
  avatar: {
    
    marginBottom: 20,
  },
  card: {
    width: '95%',
    marginTop: 5,
    marginBottom: 10,
  },
  descriptionText: {
     textAlign: 'center',
  },
  input: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  button: {
    marginHorizontal: 10,
  },
  taskListButton: {
    marginTop: 20,
    width: '80%',
  }
});