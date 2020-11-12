import * as React from 'react';
import { Text, TextInput, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import RegisterUsScreen from '../screens/RegistroUs'
import RegisterProfScreen from '../screens/RegistroProf'
const imgFooter = require('../assets/reg.jpg');

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      cardstate: 0,
      isFocused: false
    }
  }
  onFocusChange = () => {
    this.setState({ isFocused: true });
  }

 

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={(this.state.cardstate == 1) ? styles.buttonUs : styles.buttonUsF} onPress={() => this.setState({ cardstate: 0 })}>
            <Text style={styles.textButton}>Registro alumnos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={(this.state.cardstate == 0) ? styles.buttonTut : styles.buttonTutF} onPress={() => this.setState({ cardstate: 1 })}>
            <Text style={styles.textButton}>Registro tutores</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          {this.state.cardstate == 0 ? (<RegisterUsScreen navigation={this.props.navigation}/>) : (<RegisterProfScreen navigation={this.props.navigation} />)}
          
        </View>
       

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   
    width: '100%',
    height:'80%'
    
  },
  buttonUs: {
    alignItems: "center",
    padding: 10,
    width: '70%',
    marginLeft: '-25%',

  },
  buttonUsF: {
    alignItems: "center",
    padding: 10,
    width: '70%',
    marginLeft: '-25%',
    borderBottomWidth: 2,
    borderBottomColor: '#22d48a',
    

  },
  buttonTut: {
    alignItems: "center",
    padding: 10,
    width: '70%',
    marginLeft: '15%',



  },
  buttonTutF: {
    alignItems: "center",
    padding: 10,
    width: '70%',
    marginLeft: '15%',
    borderBottomWidth: 2,
    borderBottomColor: '#22d48a',



  },

  buttonContainer: {
    alignSelf: 'center',
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  tabsContainer: {
    height: '100%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#e1e9f5',
    borderRadius: 30,
    backgroundColor: 'white'

  },
  
 
  textButton: {
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',

  }
})