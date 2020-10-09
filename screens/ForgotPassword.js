import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,TouchableHighlight } from 'react-native';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Has olvidado tu contraseña? </Text>
        <Text style={styles.textMsg}> Ingresa tu correo electronico para solicitar tu cambio de contrasena. </Text>
        <TextInput style={styles.textInput}></TextInput>
        <TouchableHighlight style={styles.button}><Text style={styles.buttonText}>Enviar</Text></TouchableHighlight>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'#22d48a'
    
  },
  textTitle:{
    marginTop:'25%',
    fontWeight:'bold',
    fontSize:35,
    color:'white'
  },
  textMsg:{
    marginTop:'10%',
    fontWeight:'bold',
    fontSize:15,
    color:'white'
  },
  textInput:{
    marginTop:'10%',
    width:'100%',
    height:'10%',
    backgroundColor:'white',
    borderRadius:5,
    alignSelf:'center'
    
  },
  button:{
    marginTop:'10%',
    width:'100%',
    height:'10%',
    backgroundColor:'#b6f007',
    borderRadius:10,
    alignItems:'center',
    padding:25
  },
  buttonText:{
    fontSize:22,
    fontWeight:'bold',
    color:'white'
  }
})