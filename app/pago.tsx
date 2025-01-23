import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

export default function Home() {
  const route = useRoute();
  const [labelText] = useState(String(route.params.email));
  console.log(labelText);
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>Pagar</Text>
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Dar permisos</Text>
        </Pressable>
        <Link href={{ pathname: '/scanner', params: { miusuario: labelText } }} asChild>
          <Pressable style={[styles.button, !isPermissionGranted && styles.buttonDisabled]} disabled={!isPermissionGranted}>
            <Text style={styles.buttonText}>Escanear</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
     backgroundColor: '#00ff7c',
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#0E7AFE",
    fontSize: 35,
    marginBottom: 20,
    fontWeight: "bold",
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0E7AFE",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
