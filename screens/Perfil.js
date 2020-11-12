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
         <TouchableOpacity style={styles.resButtons}>
           <Text style={styles.textButton}>Clases</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.resButtons}>
           <Text style={styles.textButton}>Cartera</Text>
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
      width:'80%',
      alignSelf:'center'
    },
    textButton:{
      fontSize:15,
      color:'white',
      alignSelf:'center',
      padding:15

    },
    resButtons:{
      width:'40%',
      height:'100%',
      backgroundColor:'#40E29F',
      borderRadius:10
    }
  })