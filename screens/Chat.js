import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import { Icon } from 'react-native-elements'

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
   
    return (
      <View>
        <TouchableOpacity style={styles.cardHome}>
          <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
            <Text>Raul Flores</Text>
            
            <Icon
            name='forward' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardHome}>
          <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
            <Text>Raul Flores</Text>
            
            <Icon
            name='forward' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardHome}>
          <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
            <Text>Raul Flores</Text>
            
            <Icon
            name='forward' />
          </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
   
  },
  textTitle:{
    color:'gray',
    fontSize:30,
    padding:20
  },
  cardsContainer:{
    width:'100%',
    height:'25%'
  },
  imgAvatar:{
    width: 40,
    height: 40,
    borderRadius: 150 / 2,
    overflow: "hidden",
},
cardHome:{
  width:'100%',
  height:'20%',
  backgroundColor:'white',
  alignContent:'center',
  justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row'
 
  
}
})
