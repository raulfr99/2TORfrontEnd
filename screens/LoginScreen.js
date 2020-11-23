import * as React from 'react';
import { Text, TextInput, View, Image, ImageBackground, StyleSheet, TouchableOpacity,KeyboardAvoidingView,SafeAreaView } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements'
import { set } from 'react-native-reanimated';
import Test from './Test';
import AwesomeAlert from 'react-native-awesome-alerts';

import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


const imgbg = require('../assets/ex.jpg');
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    

    this.state = {
      email: '',
      password: '',
      showAlert: false,
      state:'',
      showAlertLog:false,
      alertColor:'',
      emailProp:false,
      alertMsg:'',
      showLoading:false
    }
  }
  
  
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };
 
  
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
    
  }
  
  
  submit() {
    
   
    let collection = {}
    collection.email = (this.state.email).toLocaleLowerCase(),
    collection.password = this.state.password,
    collection.ip = '201.165.132.61'

    console.log(collection)

    var url = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/login/';

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json().then(data => ({
        data: data,
        status: res.status
      }))
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response.status, response.data)
          if (response.status == '200') {
           
            AsyncStorage.setItem('token',response.data.tokens.access)
            AsyncStorage.setItem('nombre',response.data.name_lastname)
            AsyncStorage.setItem('imagen_perfil',response.data.profile_photo)
            AsyncStorage.setItem('id',response.data.id)
            AsyncStorage.setItem('user',JSON.stringify(response.data.user))
            
            this.state.showAlertLog = true
            this.props.navigation.navigate('Home')
            
          }
          else if (response.status == '403') {
          
            this.state.state=response.data.detail
            this.setState({alertMsg:response.data.detail})
            //this.state.alertColor="red"
            this.showAlert()
         // this.showProp()
            
          }
          else if (response.status == '400' && response.data.password) {
          
            this.setState({alertMsg:response.data.password})
            this.showAlert()
          }
          else if (response.status == '400' && response.data.password) {
           
            this.setState({alertMsg:response.data.password})
            this.showAlert()
         
          }
          else if (response.status == '400' && response.data.email) {
           
            this.setState({alertMsg:response.data.email})
            this.showAlert()
         
          }

        }));


  }

  render() {
  
    const text =this.state.state
    const styleAlertText={
      alignSelf:'center',
      fontSize:10,
      padding:20,
      fontWeight:'bold',
      marginTop:'6%',
      color:'red'
    }
    return (
     
     
      <ScrollView contentContainerStyle={{flex:1,width:'100%',height:'100%'}}>
      
        <Text style={styles.textTitle}>Entrar</Text>
        <View style={styles.containerUserName} >

          <TextInput placeholder="Email" placeholderTextColor="gray" 
          keyboardType='email-address'
          autoCapitalize = 'none'
          autoCompleteType="email"
          autoCorrect={false}
            style={styles.textInput} onChangeText={(value)=>this.setState({email:value})} name="email" autoFocus={this.state.emailProp} value={this.state.email} />
        </View>

        <View style={styles.containerPassword}>

          <TextInput placeholder="Contraseña" placeholderTextColor="gray"
           autoCapitalize={false}
           autoCorrect={false}
            style={styles.textInput} onChangeText={(value)=>this.setState({password:value})} name="password"  secureTextEntry={ true } />
        </View>

        <View style={styles.containerSignIn}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.submit()}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      
        
          <Text style={styles.alertText} disabled={this.state.showAlertLog}  style={styleAlertText}>{text}</Text>

          <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Alerta!"
          message={this.state.alertMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          
          showConfirmButton={true}
         
          confirmText="Aceptar"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        
        
          </ScrollView>
          
     

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height:'100%'
  },
  containerSignIn: {
    height: 60,
    width: '30%',
    marginTop: 10,
    alignSelf: 'center',


  },

  containerUserName: {
    height: 60,
    
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: '5%'
  },
  containerPassword: {
    height: 60,
    
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: '10%'
  },

  icon: {
    flex: 1
  },
  textInput: {
    backgroundColor: 'transparent',
    flex: 5,
    color: 'black',
    
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: 'left',
  },
  textInputP: {
    backgroundColor: 'red',
    flex: 5,
    color: 'black',
    paddingLeft: '25%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    textAlign: 'left',
  },
  buttonLogin: {
    justifyContent:'center',
    backgroundColor: '#22d48a',
    borderRadius: 5,
    alignItems: 'center',
    padding:20,
    height:'100%',
    width: '280%',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  textTitle: {
    color: 'gray',
    fontSize: 15,
    alignSelf: 'center',
    marginTop:'5%',
    fontWeight: 'bold'

  },
  prueba: {
    borderColor: 'red'
  },
  alertText:{
    alignSelf:'center',
    fontSize:10,
    padding:20,
    fontWeight:'bold',
    
  }
})