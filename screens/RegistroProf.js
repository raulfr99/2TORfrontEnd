import * as React from 'react';
import { Text, TextInput, View, ImageBackground, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { Icon, Button, Avatar } from 'react-native-elements'

const imgFooter = require('../assets/reg.jpg');
const imgCamera = require('../assets/camara.png')

export default class RegisterProfScreen extends React.Component {
  

  render() {

    return (
      <View style={styles.container}>

        
        <View style={styles.containerName}>

          <TextInput placeholder="Nombre y apellido" placeholderTextColor="gray"
            style={styles.textInput} onChange={this.changeHandler} name="name" />
        </View>

        <View style={styles.containerEmail}>

          <TextInput placeholder="Email" placeholderTextColor="gray"
            style={styles.textInput} onChange={this.changeHandler} name="email" />
        </View>

        <View style={styles.containerPassword}>

          <TextInput placeholder="Contrasena" placeholderTextColor="gray"
            style={styles.textInput} onChange={this.changeHandler} name="password" secureTextEntry={true} />
        </View>
        <View style={styles.containerPicker}>
          <Picker
            selectedValue="Zona de preferencias"
            style={styles.picker} >
            <Picker.Item label="Matematicas" value="java" />
            <Picker.Item label="Espanol" value="js" />
          </Picker>
        </View>

        <View style={styles.containerSignIn}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.submit()}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Siguente</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerSignIn}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.props.navigation.navigate('Steps')}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Siguente</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.stepContainer}>
          
          <View style={styles.step}>
          <TouchableOpacity style={styles.buttonStep}></TouchableOpacity>
          </View>
          <View style={styles.step}>
          <TouchableOpacity style={styles.buttonStep}></TouchableOpacity>
          </View>
          <View style={styles.step}>
          <TouchableOpacity style={styles.buttonStep}></TouchableOpacity>
          </View>
          <View style={styles.step}>
          <TouchableOpacity style={styles.buttonStep}></TouchableOpacity>
          </View>
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
   
    
    
    width: '100%',
    height: '100%',
  

  },
  
  
  containerName: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
   
    

  },
 
  containerPassword: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%'
  },
  containerEmail: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%'
  },
  containerPicker: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%'
  },
 
  icon: {
    flex: 1
  },
  textInput: {
    backgroundColor: 'transparent',
    flex: 5,
    color: 'black',
    paddingLeft: '25%'
  },
  textInput: {
    backgroundColor: 'transparent',
    flex: 5,
    color: 'black',

    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: 'left'



  },
  containerSignIn: {
    height: 60,
    width: '30%',
    marginTop: 10,
    alignSelf: 'center',


  },
  buttonLogin: {
    backgroundColor: '#22d48a',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: '350%',
    alignSelf: 'center',
    marginTop: '15%',

  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: 15
  },
  picker: {
    backgroundColor: 'transparent',
    flex: 5,
    backgroundColor:'transparent',
    flex:5,
    borderColor: 'black',
    borderBottomWidth:1,
    borderRadius: 10,
    alignSelf: 'center',
   
    color:'gray',
    
    
    color: 'gray',
    

  },

  buttonStep:{
    backgroundColor: '#22d48a',
    justifyContent: 'center',
    alignContent: 'center',
   
    borderRadius: 25,
    width: 30,
    height: 30,
  },
  stepContainer:{
    
    width:'100%',
    height:'5%',
    backgroundColor:'white',
    marginTop:'10%',
    flexDirection: 'row'
  },
  step:{
    width:'25%',
    height:'100%',
   
    padding:15
  },
  stepText:{
    fontSize:6,
    color:'gray',
    fontWeight:'bold',
    alignSelf:'center'

  }
})