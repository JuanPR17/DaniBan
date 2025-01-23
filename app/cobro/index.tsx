import {StyleSheet, Pressable, SafeAreaView, View, Text, TextInput} from 'react-native';
import { Link, Stack } from "expo-router";
import React, {useEffect, useState} from 'react';
import { Button } from '@react-navigation/elements';
import {
  createStaticNavigation,
  useNavigation,
  useRoute
} from '@react-navigation/native';

export default function NotFoundScreen() {
  console.log("Movimientos")
  const route = useRoute();
  const [userId] = useState(String(route.params.userId));
  console.log(userId)

  const [monto, onChangeText] = React.useState('');

  const navigation = useNavigation();
  const getMovimientos = async () => {
    try {
      console.log("Movimientos")
      const response = await fetch(
        'http://192.168.1.82:3000/menu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const generateQR = async () => {
    try {
      let json = {
        opcion: "2",
        email: userId,
        operacion: "+",
        monto: monto
      }
      navigation.navigate('Qr', {
        monto: json
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <View>
        <Text style={styles.title}>Cobro</Text>
        <Text style={styles.title}>Ingrese monto</Text>
        <TextInput
          style={styles.inputStyle}
          value={monto}
          keyboardType="numeric"
          onChangeText={onChangeText}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => generateQR()}
          >
            <Text style={styles.buttonText}>Cobrar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#00ff7c',
    justifyContent: "space-around",
  },
  title: {
    color: "#0E7AFE",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20
  },
  inputStyle: {
    color: "#0E7AFE",
    backgroundColor: "white",
    fontSize: 20,
    textAlign: "center",
    borderColor: "#0E7AFE",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: "#FF6347", // Cambia el color del botón
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    color: "white", // Color del texto del botón
    fontSize: 18,
    textAlign: "center",
  }
});
