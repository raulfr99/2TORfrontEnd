import * as React from 'react';
import { Text,TextInput,View, Image,ImageBackground, StyleSheet,TouchableOpacity,Alert } from 'react-native';
import { Icon,Button,Card } from 'react-native-elements'
import { Avatar, Accessory } from 'react-native-elements';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/Register';
const imgbg = require('../assets/fondo2.jpg');
import { AsyncStorage } from 'react-native';

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
         <View style={styles.tabsContainer}>
         {this.state.cardstate == 0 ? ( <LoginScreen/> ) : ( <RegisterScreen/> )}
         </View>
         
        
          </View>    
          
          <Text style={styles.recuperarText}>Recuperar Password</Text>
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
    height:'80%',
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
  }
})