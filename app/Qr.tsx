

import {Stack } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";

import React, {useState} from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import QRCode from 'react-native-qrcode-svg';
import {QRCodeSVG} from 'qrcode.react';


import {
  createStaticNavigation,
  useNavigation,
  useRoute
} from '@react-navigation/native';



export default function NotFoundScreen( ) {
  console.log("Generate QR")
  const route = useRoute();
  const [monto] = useState(JSON.stringify((route.params.monto)));
  console.log(monto)
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>Escane Codigo QR</Text>
      <View style={{ gap: 20 }}>
      <QRCode 
       value={monto} // Valor a codificar en el QR
       size={256}
       
      />
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
    paddingVertical: 80,
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
  title: {
    color: "black",
    fontSize: 40,
  },
  
});
