import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,Alert,ScrollView,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, ListItem, Icon } from 'react-native-elements'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      id:''
    };
  }
  componentDidMount(){
    this.getProfileData()
  }
  getProfileData = async () => {
    this.setState({user: await AsyncStorage.getItem('user')})
    this.setState({id: await AsyncStorage.getItem('id')})
    
    
  }
  getCount(){
    Alert.alert('Test: '+this.state.id)
  }
  render() {
    
    return (
     
      <View style={styles.container}>
      <ScrollView >
        
      <View>
        {}
        <Text style={styles.textTitle}>Para Ti:</Text>
        {this.state.user == 'false' ?
         (<ScrollView horizontal={true}>
         <TouchableOpacity style={styles.cardHome}>
         <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
           <Text>Raul Flores</Text>
           
           <Text style={{color:'gray'}}>Ingles</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.cardHome}>
         <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
           <Text>Raul Flores</Text>
           
           <Text style={{color:'gray'}}>Ingles</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.cardHome}>
         <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
           <Text>Raul Flores</Text>
          
           <Text style={{color:'gray'}}>Ingles</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.cardHome}>
         <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
           <Text>Raul Flores</Text>
           
           <Text style={{color:'gray'}}>Ingles</Text>
         </TouchableOpacity>
         
         </ScrollView>  
         )
        : (<Text>Hola</Text>)}
       
      </View>
      
      <View style={styles.cardsContainer}>
        <Text style={styles.textTitle}>Otras opciones:</Text>
       
      </View>
     
      </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
     backgroundColor:'#F6F5FA'
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
      width: 60,
      height: 60,
      borderRadius: 150 / 2,
      overflow: "hidden",
  },
  cardHome:{
    backgroundColor:'white',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    margin:20
  }
})