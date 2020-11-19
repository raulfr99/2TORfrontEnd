import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

export default class Notificaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.card} onPress={()=>this.props.navigation.navigate('ChatMessages',{data:item})}>
     
        
        <Image
        source={require('../assets/logo.png')}
        style={styles.imgAvatar}
        />
        <Text>Raul Flores</Text>
        <Icon
        name='check' />
      </TouchableOpacity>
      

        <View style={styles.metodoView}>
        <Image source={require('../assets/logo.png')} style={styles.metodoIcon}/>
          <Text style={styles.metodoText}>2TOR agrega un metodo de pago</Text>
          </View>

        <View style={styles.startView}>
          
          <Text style={styles.startText}>Bienvenido a 2TOR!</Text></View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    height:'100%',
    width:'100%'
    
  },
  startView:{
    backgroundColor:'#40E29F',
    width:'100%',
    height:'20%',
    justifyContent: 'center',
  },
  startText:{
    color:'white',
    padding:20,
    fontSize:20,
    alignSelf:'center',
    fontWeight:'bold'
  },
  metodoView:{
    marginTop:'20%',
    backgroundColor:'white',
    width:'100%',
    height:'20%',
    justifyContent: 'center',
    flexDirection:'row'
  },
  metodoText:{
    
    padding:20,
    fontSize:15,
    alignSelf:'center',
     },
  metodoIcon:{
    width:30,
    height:30,
    alignSelf:'center'
  },
  card:{
    width:'100%',
    padding:15,
    backgroundColor:'white',
    alignContent:'center',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    borderBottomWidth:0.5,
    borderBottomColor:'gray'
   
    
  },
  imgAvatar:{
    width:30,
    height:30
  }

})
