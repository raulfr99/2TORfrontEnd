import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,Alert,ScrollView,TouchableOpacity,Image} from 'react-native';
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
        avatarStyle={styles.avatar}
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

          <ScrollView>
            {this.state.buttonState==0 ? (
              <View>
              <TouchableOpacity style={styles.cardClasses}>
              <Image source={require('../assets/logo.png')} style={styles.metodoIcon}/>
              <Text>Raul Flores</Text>
              <Text>Descripcion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardClasses}>
              <Image source={require('../assets/logo.png')} style={styles.metodoIcon}/>
              <Text>Raul Flores</Text>
              <Text>Descripcion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardClasses}>
              <Image source={require('../assets/logo.png')} style={styles.metodoIcon}/>
              <Text>Raul Flores</Text>
              <Text>Descripcion</Text>
              </TouchableOpacity>
              </View>

            ) : this.state.buttonState==1 ? (
              <View stlye={{flex:1}}>
                <Image source={require('../assets/credit.png')}
                style={styles.imgCard}
              />
              </View>
              
            ):(null)
          
          }
            
           
           </ScrollView>
        
        
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
      
      bottom:0,
      left:0,
      
     
    },
    conatainerData:{
      flexDirection:'row',
      alignContent:'flex-start',
      
      width:'100%',
     
    
    },
    avatar:{
      height:60,
      width:60,
     
      alignSelf:'flex-end',
      marginRight:'10%'
      
    },
    textTitle:{
      color:'gray',
      fontSize:25,
      padding:15
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
      borderRadius:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textButtonB:{
      fontSize:15,
      
      alignSelf:'center',
      padding:15,
      

    },
    resButtonsB:{
      width:'33%',
      height:'100%',
      backgroundColor:'white',
      borderRadius:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardClasses:{
      marginTop:'5%',
      width:'80%',
      justifyContent: 'center',
      borderRadius:10,
      alignSelf:'center',
      backgroundColor:'white',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    metodoIcon:{
      width:50,
      height:50,
      alignSelf:'center'
    },
    imgCard:{
      width:230,
      height:130,
      alignSelf:'center',
      padding:20,
      marginTop:'10%'
    }
  })