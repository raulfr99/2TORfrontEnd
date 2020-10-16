import React, { Component } from 'react';
import { View, Text,StyleSheet,TextInput,TouchableHighlight,AsyncStorage } from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    let loggedIn;
   this.state = {
     cardstate:0,
     loggedIn
   }
   this.getStorageValue()
    
  }
  async getStorageValue(){
    this.token =  await AsyncStorage.getItem('token');
     //console.log('ala: '+this.token);
      
     if(this.token==null){
        this.setState({loggedIn :false})
     }
     else {
       this.setState({loggedIn :true})
     }
     if(this.state.loggedIn){
        this.props.navigation.navigate('App');
     }
     else{
        this.props.navigation.navigate('Auth');
     }
 }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>CARGANDO </Text>
        
        
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