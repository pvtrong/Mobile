import * as React from 'react';
import { ScrollView, StyleSheet, } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Pomodoro from "./components/Pomodoro"
import Header from "./components/Header"
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Pomodoro />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1
  }
});
