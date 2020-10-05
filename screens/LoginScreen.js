import * as React from 'react';
import { Text, TextInput, View, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button, Card } from 'react-native-elements'
import { set } from 'react-native-reanimated';
import Test from './Test';
import { AsyncStorage } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

const imgbg = require('../assets/ex.jpg');
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    

    this.state = {
      email: '',
      password: '',
      showAlert: false,
      state:'',
      showAlertLog:false
    }
  }
  static navigationOptions = {
    header: null
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
    collection.email = this.state.email,
      collection.password = this.state.password

    console.log(collection)

    var url = 'http://127.0.0.1:8000/auth/login/';

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
            localStorage.setItem("token", response.data.tokens)
            this.state.showAlertLog = true
            window.location.reload(false);
            
          }
          else if (response.status == '403') {
            this.state.state=response.data.detail
            this.showAlert()
            
          }
          else if (response.status == '401') {
            this.state.state=response.data.detail
            this.showAlert()
            
          }
          else if (response.status == '400' && response.data.password) {
            this.state.state=response.data.password
            this.showAlert()
          }
          else if (response.status == '400' && response.data.email) {
            this.state.state=response.data.email
            this.showAlert()
          }

        }));


  }

  render() {
    const { email, password } = this.state;
    const {showAlert,showAlertLog} = this.state;
    
    return (
      <View style={styles.container}>


        <Text style={styles.textTitle}>Entrar</Text>
        <View style={styles.containerUserName} >

          <TextInput placeholder="Email" placeholderTextColor="gray"
            style={styles.textInput} onChange={this.changeHandler} name="email" value={email} selectionColor="red"  />
        </View>

        <View style={styles.containerPassword}>

          <TextInput placeholder="Contrasena" placeholderTextColor="gray"
            style={styles.textInput} onChange={this.changeHandler} name="password" value={password} secureTextEntry={true} />
        </View>

        <View style={styles.containerSignIn}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.submit()}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Advertencia"
          message={this.state.state}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
         <AwesomeAlert
          show={showAlertLog}
          showProgress={true}
          title="Bienvenido"
          message="Ingresando"
         
        />
     
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%'
  },
  containerSignIn: {
    height: 60,
    width: '30%',
    marginTop: '10px',
    alignSelf: 'center',


  },

  containerUserName: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: '15%',
    marginRight: '15%',
    marginBottom: '5%'
  },
  containerPassword: {
    height: 60,
    flexDirection: 'row',
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
    backgroundColor: '#22d48a',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: '20%',
    paddingBottom: '20px',
    width: '280%',
    alignSelf: 'center'
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  textTitle: {
    color: 'gray',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: '-15%',
    marginBottom: '15%',
    fontWeight: 'bold'

  },
  prueba: {
    borderColor: 'red'
  }
})