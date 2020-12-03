import React, { Component } from 'react';
import { View, Text,StyleSheet,AsyncStorage,TouchableOpacity,ImageBackground,Alert } from 'react-native';
const imgbg = require('../assets/fondo2.jpg');
const logoI = require('../assets/logo.png')
import { Avatar } from 'react-native-elements';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    let loggedIn;
   this.state = {
     cardstate:0,
     loggedIn,
     month:'',
     day:'',
     year:''
   }
  
    
  }
  async componentDidMount(){
    var d = new Date();
    this.setState({day:d.getDate()})
    this.setState({year:d.getFullYear()})
    var month = new Array();
    month[0] = "Enero";
    month[1] = "Febrero";
    month[2] = "Marzo";
    month[3] = "Abril";
    month[4] = "Mayo";
    month[5] = "Junio";
    month[6] = "Julio";
    month[7] = "Agosto";
    month[8] = "Septiembre";
    month[9] = "Octubre";
    month[10] = "Noviembre";
    month[11] = "Diciembre";
    this.setState({month:month[d.getMonth()]})
    
    this.token =  await AsyncStorage.getItem('token');
    if(this.token!=null){
      this.props.navigation.navigate('App');
   }
   else {
     
   }
  }
  async getStorageValue(){
    this.token =  await AsyncStorage.getItem('token');
     //console.log('ala: '+this.token);
      
     if(this.token==null){
        this.setState({loggedIn :false})
     }
    
     if(this.state.loggedIn == false){
      this.props.navigation.navigate('Auth');
     }
    
 }

  render() {
    return (
      <View style={styles.container} >
        
        <ImageBackground  source={imgbg} resizeMode='cover' style={styles.container}
        >
           <Avatar
              style={styles.avatar}
              rounded
              source={logoI}
                />
        <TouchableOpacity onPress={()=>this.getStorageValue()} style={styles.container}>

      <View style={styles.containerPhrase}>
       
        <Text style={styles.day}>
          {this.state.day}
        </Text>
        <Text style={styles.date}>
          {this.state.month}, {this.state.year}
        </Text>
          
      
        <View style={styles.phraseView}>
             <Text style={styles.welcome}>Bienvenido a 2Tor!</Text> 
          </View>
      </View>

        </TouchableOpacity>
        
        </ImageBackground>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    flex:1,
    
    
  },
  avatar:{
    height:100,
    width:100,
    alignSelf:'center',
   
    marginTop:'30%'
  },
  containerPhrase:{
    position:'absolute',
    bottom:0,
    left:0,
    width:'100%',
    height:'70%',
    
    
    
  },
  phraseView:{
    marginTop:'10%',
    backgroundColor: 'rgba(255,255,255, 0.3)',
    height:'100%',
    
   
    
   
  },
  day:{
    color:'white',
    fontSize:55,
    fontWeight:'bold',
    
  },
  date:{
    
      color:'white',
      fontSize:30,
      
    
  },
  welcome:{
      fontSize:30,
      marginTop:'15%',
      marginLeft:'4%'
  }
})