import {StyleSheet, Platform ,Alert,TextInput,Text} from 'react-native';
import {Stack } from 'expo-router';
import React, {useEffect,useState} from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import movimientos from './movimientos'
import tranferencia from './tranferencia'
import { Button } from '@react-navigation/elements';

import { View } from 'react-native';

import {
  createStaticNavigation,
  useNavigation,
  useRoute
} from '@react-navigation/native';



export default function NotFoundScreen( ) {
  console.log("Movimientos")
  const route = useRoute();
  const [monto,onChangeText] = React.useState('');
  
 
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
      navigation.navigate('Qr', {
        monto: monto
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Salir!' }} />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tranferencia</ThemedText> 
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
      
        <TextInput style={styles.buttonStyle} value={monto} keyboardType="numeric" onChangeText={onChangeText}/>
        <Button onPress={() => generateQR()}>
       Generar QR
      </Button>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  buttonStyle: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
});
