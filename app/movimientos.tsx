import { Stack } from 'expo-router';
import { StyleSheet, FlatList, View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

let mov: any;

export default function NotFoundScreen() {
  const [data, setData] = useState(null);
  const route = useRoute();
  const [labelText] = useState(String(route.params.email));

  const getMovimientosUser = async () => {
    try {
      console.log("Movimientos");
      console.log(labelText);

      const response = await fetch(
        'http://192.168.1.82:3000/menu', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opcion: '3',
          email: labelText,
        }),
      });
      const json = await response.json();
      setData(json.movimientos);
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovimientosUser();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.titleText}></ThemedText>
        <ThemedText type="title" style={styles.titleText}>Movimientos:</ThemedText>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cellText}>{item.NuevoSaldo}</Text>
                <Text style={styles.cellText}>{item.fecha}</Text>
              </View>
            )}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.headerCell}>Saldo</Text>
                <Text style={styles.headerCell}>Fecha</Text>
              </View>
            }
          />
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#fff',
  },
  cellText: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'black', // Fondo del encabezado negro
    paddingVertical: 10,
    borderRadius: 5, // Redondear los bordes de la pestaña
  },
  headerCell: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white', // Texto blanco en la pestaña negra
  },
  titleText: {
    color: 'black', // Color del texto "Movimientos"
  },
});
