import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,ScrollView,SafeAreaView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/Register'
import Navigator from './routes/homeStack';

Amplify.configure(config)

export default withAuthenticator(App)

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
