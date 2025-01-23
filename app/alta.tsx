import { StyleSheet, SafeAreaView, View, Text, TextInput } from 'react-native';
import { Stack } from "expo-router";
import { Button } from '@react-navigation/elements';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setcontraseña] = useState('');
  const [monto, setMonto] = useState('');

  const insert = async () => {
    try {
      const response = await fetch('http://192.168.1.82:3000/menu', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: "1",
          nombre: nombre,
          apellido: apellido,
          email: email,
          saldo: monto,
        }),
      });
      const json = await response.json();
      navigation.navigate('Detalles', {
        email: email,
        saldo: monto,
      });
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>Registro de usuario</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
        <Text style={styles.label}>Apellido</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={setApellido}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>contraseña</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={contraseña}
          onChangeText={setcontraseña}
        />
        <Text style={styles.label}>Monto</Text>
        <TextInput
          style={styles.input}
          value={monto}
          keyboardType="numeric"
          onChangeText={setMonto}
        />
        <Button onPress={insert} title="Guardar" color="#841584" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0E7AFE',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#0E7AFE',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
