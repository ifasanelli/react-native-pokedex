import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Pokedex from './pages/Pokedex';


export default function App() {
  return(
    <Pokedex />
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dd0000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  }
});

