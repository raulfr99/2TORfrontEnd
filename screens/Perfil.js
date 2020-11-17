import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,Alert,ScrollView,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar} from 'react-native-elements';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagen_perfil:'',
      nombre:'',
      buttonState:0
    };
  }
  componentDidMount(){
    this.getProfileData()
  }
  getProfileData = async () => {
    this.setState({imagen_perfil:await AsyncStorage.getItem('imagen_perfil')})
    this.setState({nombre:await AsyncStorage.getItem('nombre')})
    console.log('GATTI: '+this.state.imagen_perfil)
  }
  test =() => {
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('user')
    this.props.navigation.navigate('Auth');
    
  }
  render() {
    return (
   <View style={styles.container}>
        
        <View style={styles.conatainerData}>
          
        <Text style={styles.textTitle}> Hola {this.state.nombre}:  </Text>
     
       
        </View>
        <Avatar
        style={styles.avatar}
        rounded
        source={this.state.imagen_perfil ? { uri: this.state.imagen_perfil } : null}
        />
       
        <Text style={styles.textTitle}>Tu resumen:</Text>
        <View style={styles.perContainer}>
         <TouchableOpacity style={(this.state.buttonState)===0 ? (styles.resButtons):(styles.resButtonsB)} onPress={()=>this.setState({buttonState:0})}>
           <Text style={(this.state.buttonState)===0 ? (styles.textButton):(styles.textButtonB)}>Clases</Text>
         </TouchableOpacity>
         <TouchableOpacity style={(this.state.buttonState)===2 ? (styles.resButtons):(styles.resButtonsB)} onPress={()=>{this.props.navigation.navigate('Ofertas');this.setState({buttonState:2})}} >
           <Text style={(this.state.buttonState)===2 ? (styles.textButton):(styles.textButtonB)}>Ofertas</Text>
         </TouchableOpacity>
         <TouchableOpacity style={(this.state.buttonState)===1 ? (styles.resButtons):(styles.resButtonsB)} onPress={()=>this.setState({buttonState:1})}>
           <Text style={(this.state.buttonState)===1 ? (styles.textButton):(styles.textButtonB)}>Cartera</Text>
         </TouchableOpacity>
         
        </View>
        
         <TouchableOpacity onPress={()=>this.test()} style={styles.buttonLogout}>
           <Text style={styles.textButton}>Cerrar Sesion</Text>
           </TouchableOpacity>
        
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
      width:'100%',
      height:'100%',
      flex:1,
      backgroundColor:'#F6F5FA'
     
    },
    buttonLogout:{
      width:'100%',
      height:'10%',
      backgroundColor:'#40E29F',
      alignSelf:'center',
      position: 'absolute',
      bottom:0,
      left:0,
      
     
    },
    conatainerData:{
      flexDirection:'row',
      alignContent:'flex-start',
      
      width:'100%',
     
    
    },
    avatar:{
      height:70,
      width:70,
     
      alignSelf:'flex-end',
      marginRight:'10%'
      
    },
    textTitle:{
      color:'gray',
      fontSize:30,
      padding:20
    },
    perContainer:{
      justifyContent:'space-between',
      flexDirection:'row',
      width:'90%',
      alignSelf:'center'
    },
    textButton:{
      fontSize:15,
      color:'white',
      alignSelf:'center',
      padding:15

    },
    resButtons:{
      width:'33%',
      height:'100%',
      backgroundColor:'#40E29F',
      borderRadius:5
    },
    textButtonB:{
      fontSize:15,
      
      alignSelf:'center',
      padding:15

    },
    resButtonsB:{
      width:'33%',
      height:'100%',
      backgroundColor:'white',
      borderRadius:5
    },
  })