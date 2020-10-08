import * as React from 'react';
import { Text,TextInput,View, Image,ImageBackground, StyleSheet,TouchableOpacity,Alert,TouchableHighlight } from 'react-native';
import { Icon,Button,Card } from 'react-native-elements'
import { Avatar, Accessory } from 'react-native-elements';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
const imgbg = require('../assets/fondo2.jpg');
import { AsyncStorage } from 'react-native';
import  { useState } from "react";

export default class Test extends React.Component {
  constructor(props){
    super(props)
    
   
   const token = localStorage.getItem('token')
 
  console.log('eminem: '+token)
    let loggedIn = true
    if(token==null){
        loggedIn = false
    }
   
    this.state = {
      cardstate:0,
      loggedIn
    }
}


  render() {
    
    
      if(this.state.loggedIn){
        this.props.navigation.navigate('Home')
      }
   
      

    return (
      <ImageBackground  source={imgbg}style={styles.imgBack}>
         <Avatar
              style={styles.avatar}
              rounded
              source={{
                    uri:
                      require("../assets/logo.png"),
                   }}
                />
          <View style={styles.container}>
              
              <View style={styles.buttonContainer}>
              <TouchableOpacity
         style={styles.buttonLogin} onPress={() => this.setState({ cardstate: 0})}>
        <Text style={styles.textButton}>Entrar</Text>
         </TouchableOpacity>
         <TouchableOpacity
         style={styles.buttonRegister} onPress={() => this.setState({ cardstate: 1})}>
        <Text style={styles.textButton}>Registrar</Text>
         </TouchableOpacity>
         </View>
         
         {this.state.cardstate == 0 ? ( <View style={styles.loginContainer}><LoginScreen/></View> ) 
         : ( <View style={styles.registerContainer}><RegisterScreen/></View> )}
         
         
         
        
          </View>    
          
          
          <Text style={styles.recuperarText}onPress={()=>alert('hola')}>Recuperar Password</Text>
         </ImageBackground>   
        
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    height:'100%',
  },
  buttonLogin:{
    alignItems: "center",
    padding: 10,
    width:'45%',
    marginLeft:'-15%',
    
    
  },
  buttonRegister:{
    alignItems: "center",
    padding: 10,
    width:'45%',
    marginLeft:'40%',
    
    
  },
  
  buttonContainer: {
   alignSelf:'center',
    width:'50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    
  },
  tabsContainer:{
    height:'90%',
    width:'80%',
    alignSelf:'center',
    backgroundColor:'#e1e9f5',
    borderRadius:30,
    backgroundColor:'white',
    

  },
  loginContainer:{
    height:'70%',
    width:'80%',
    alignSelf:'center',
    backgroundColor:'#e1e9f5',
    borderRadius:30,
    backgroundColor:'white',
    

  },
  registerContainer:{
    height:'90%',
    width:'80%',
    alignSelf:'center',
    backgroundColor:'#e1e9f5',
    borderRadius:30,
    backgroundColor:'white',
    

  },
  avatar:{
    height:'100px',
    width:'100px',
    alignSelf:'center',
    marginBottom:'-3%',
    marginTop:'12%'
  },
 
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  textButton:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  },
  imgBack:{
    resizeMode:'cover',
    flex:1,
  },
  recuperarText:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    alignSelf:'center',
    marginBottom:'10%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})