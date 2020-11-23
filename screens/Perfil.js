import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,Alert,ScrollView,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
    AsyncStorage.removeItem('id')
    AsyncStorage.removeItem('user')
    this.props.navigation.navigate('Auth');
    
  }
  render() {
    return (
     
   <View style={styles.container}>
        
        <View style={styles.conatainerData}>
          <View style={{width:'100%'}}>
        <Text style={styles.textTitle}> Hola {this.state.nombre} </Text>

     
        </View>
        <View style={{flexDirection:'row',width:'100%'}}>
        <Text style={styles.textTitle}>Tu resumen:</Text>
        <View style={{marginLeft:'25%'}}>
        <Avatar
        style={styles.avatar}
        avatarStyle={styles.avatar}
        rounded
        source={this.state.imagen_perfil ? { uri: this.state.imagen_perfil } : null}
        />
        </View>
        
        </View>
        </View>
        
       
     
       
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
              <View>  
              <Text>Raul Flores</Text>
              <Text style={{fontSize:10}}>Descripcion</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Icon name="star" size={15} />
              <Text>4.3</Text>
              </View>
             
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardClasses}>
              <Image source={require('../assets/logo.png')} style={styles.metodoIcon}/>
              <View>  
              <Text>Raul Flores</Text>
              <Text style={{fontSize:10}}>Descripcion</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon name="star" size={15}  />
              <Text>4.3</Text>
              </View>
             
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardClasses}>
              <Image source={require('../assets/logo.png')} style={styles.metodoIcon}/>
              <View>  
              <Text>Raul Flores</Text>
              <Text style={{fontSize:10}}>Descripcion</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon name="star" size={15}  />
              <Text>4.3</Text>
              </View>
             
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardClasses}>
              <Image source={require('../assets/logo.png')} style={styles.metodoIcon}/>
              <View>  
              <Text>Raul Flores</Text>
              <Text style={{fontSize:10}}>Descripcion</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon name="star" size={15}  />
              <Text>4.3</Text>
              </View>
             
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
      width:'100%',
      height:'25%',
      marginTop:'5%'
    },
    avatar:{
      height:60,
      width:60,
      alignSelf:'flex-end',
    
     marginBottom:'10%',
     borderRadius:500/2,
   
     
     
    },
    textTitle:{
      color:'gray',
      fontSize:25,
      padding:15
    },
    perContainer:{
      justifyContent:'space-around',
      flexDirection:'row',
      width:'90%',
      alignSelf:'center',
    },
    textButton:{
      fontSize:13,
      color:'white',
      alignSelf:'center',
      padding:10

    },
    resButtons:{
      width:'30%',
      height:'35%',
      justifyContent:'center',
      backgroundColor:'#40E29F',
      borderRadius:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    textButtonB:{
      fontSize:13,
      alignSelf:'center',
      padding:10,
      

    },
    resButtonsB:{
      width:'30%',
      height:'33%',
      justifyContent:'center',
      backgroundColor:'white',
      borderRadius:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
    },
    cardClasses:{
      flexDirection:'row',
      marginTop:'5%',
      width:'80%',
      justifyContent: 'space-around',
      borderRadius:10,
      alignSelf:'center',
      backgroundColor:'white',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.2,
      elevation: 1,
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