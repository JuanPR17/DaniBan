import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Stack } from "expo-router";
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigation = useNavigation();

  const validateInputs = () => {
    if (!text || !contraseña) {
      Alert.alert('Error', 'Por favor, ingrese todos los campos.');
      return false;
    }
    return true;
  };

  const getMoviesFromApiAsync = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      console.log('Input Value:', text);
      console.log('Input contraseña:', contraseña);
      const response = await fetch('http://192.168.1.82:3000/menu', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '4',
          email: text,
        }),
      });
      const json = await response.json();
      navigation.navigate('Detalles', {
        email: text,
        saldo: json.message,
      });
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Inicio", headerShown: false }} />
      <Text style={styles.title}>Bienvenido</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          onChangeText={(text) => setText(text)}
          value={text}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(contraseña) => setContraseña(contraseña)}
          value={contraseña}
        />
        <TouchableOpacity style={styles.button} onPress={getMoviesFromApiAsync}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('alta')}>
          <Text style={styles.buttonText}>Crear Usuario</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#00ffff', // Color de fondo predeterminado
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: '#ffff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00ff1b', // Controlador del color de los botones
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
