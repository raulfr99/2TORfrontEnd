import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,Alert,ScrollView,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, ListItem, Icon } from 'react-native-elements'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView >
      <View>
        <Text style={styles.textTitle}>Para Ti:</Text>
        <ScrollView horizontal={true}>
          <TouchableOpacity style={styles.cardHome}>
          <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
            <Text>Raul Flores</Text>
            
            <Text style={{color:'gray'}}>Ingles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardHome}>
          <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
            <Text>Raul Flores</Text>
            
            <Text style={{color:'gray'}}>Ingles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardHome}>
          <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
            <Text>Raul Flores</Text>
           
            <Text style={{color:'gray'}}>Ingles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardHome}>
          <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
            <Text>Raul Flores</Text>
            
            <Text style={{color:'gray'}}>Ingles</Text>
          </TouchableOpacity>
          
          </ScrollView>
      </View>
      
      <View style={styles.cardsContainer}>
        <Text style={styles.textTitle}>Otras opciones:</Text>
       
      </View>
     
      </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
     
    },
    textTitle:{
      color:'gray',
      fontSize:30,
      padding:20
    },
    cardsContainer:{
      width:'100%',
      height:'25%'
    },
    imgAvatar:{
      width: 60,
      height: 60,
      borderRadius: 150 / 2,
      overflow: "hidden",
  },
  cardHome:{
    backgroundColor:'white',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    margin:20
  }
})