import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/Register'
import Navigator from './routes/homeStack';

export default function App() {
  
  
   
  return (
    
    <Navigator/>
   
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
