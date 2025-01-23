import { Camera, CameraView } from "expo-camera";
import {Alert} from 'react-native';

import { Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Overlay } from "./Overlay";
import { useEffect, useRef ,useState} from "react";
import {
  createStaticNavigation,
  useNavigation,
  useRoute
} from '@react-navigation/native';

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const route = useRoute();
  const [userId] = useState(String(route.params.miusuario));

  const operacion = async (monto : string,email : string,operacion : string) => {
    try {
      console.log("pago")
      console.log(email)
      console.log(operacion)
      const response = await fetch(
        'http://192.168.1.82:3000/menu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "opcion":"2",
          "email":email,
          "operacion":operacion,
          "monto":monto
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              let datos =JSON.parse(data)
              await operacion(datos.monto,datos.email,"+")
              await operacion(datos.monto,userId,"-")
              Alert.alert("Tranferencia Exitosa"+datos.monto)

              await Linking.openURL(data);
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}