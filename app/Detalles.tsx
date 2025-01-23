import { StyleSheet, View, SafeAreaView, Text, Pressable, TextInput, Alert } from 'react-native';
import { Link, Stack } from "expo-router";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function NotFoundScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [labelText, setLabelText] = useState('');
  const [labelSaldo, setLabelSaldo] = useState('');

  useEffect(() => {
    setLabelText(String(route.params.email));
    setLabelSaldo(String(route.params.saldo));
  }, [route.params.email, route.params.saldo]);

  const getMovimientos = async () => {
    if (!labelText || !labelSaldo) {
      Alert.alert('Error', 'Por favor, ingrese todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.82:3000/menu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '4',
          email: labelText,
        }),
      });
      const json = await response.json();
      if (json.error) {
        Alert.alert('Error', 'Datos incorrectos.');
      } else {
        console.log("saldo" + json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovimientos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>Estado de Cuenta:</Text>
      <Text style={styles.title}>_____________</Text>
      <Text style={styles.saldo}>Saldo Actual: {labelSaldo}</Text>
      <View style={styles.linkContainer}>
        <Link href={{ pathname: '/cobro', params: { userId: labelText } }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Cobro</Text>
          </Pressable>
        </Link>
        <Link href={{ pathname: '/pago', params: { email: labelText } }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Pago</Text>
          </Pressable>
        </Link>
        <Link href={{ pathname: '/movimientos', params: { email: labelText } }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Movimientos</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#00ff7c' // Color de fondo predeterminado
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center', // Alinea el texto al centro
    marginBottom: 15,
    color: '#01',
  },
  saldo: {
    fontSize: 20,
    marginBottom: 20,
    color: '#1',
    fontWeight: 'bold'
  },
  linkContainer: {
    gap: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#0E7AFE',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
