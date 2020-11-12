import React, { Component,useState, useEffect } from 'react';
import { View, Text ,StyleSheet,TextInput,Button,ImageBackground,TouchableOpacity} from 'react-native';
import Steps from '../components/Steps'
import { Icon } from 'react-native-elements'

import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';
const imgbg = require('../assets/fondo2.jpg');
export default class StepsScreen extends Component {
    
  constructor(props,route) {
    super(props,route);
    //const {prevData}  = route.params;
   // const name = this.props.route.params.name;
    //console.log('Morris: '+ prevData)
    this.state = {
      name:null,
      email:null,
      password:null,
    };
  

  }
   openImg = async()=>{
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();

    if(permission.granted===false){
      return;
    }
    let picker = await ImagePicker.launchImageLibraryAsync()
    console.log(picker)
  }

  render() {
    return (
      <ScrollView  style={styles.scroll}contentContainerStyle={{flex: 1}}>
        <ImageBackground  source={imgbg} resizeMode="stretch"style={styles.imgBack}>
      <View style={styles.root}>
          
        <Steps initialValues={{
            username:'',
            email:'',
            avatar:''
        }}>
            
           <Steps.Step>
               {({onChangeValue,values})=>(
                <View style={styles.container}>
                  <Text style={styles.textTitle}>Descripcion</Text>
                  <TextInput style={styles.inputBox} 
                  placeholder="Descripcion. Un poco sobre de ti...">
                  </TextInput>
                  <Text style={styles.textTitle}>Tags</Text>
                  <TextInput style={styles.inputBox} 
                  placeholder="Temas, materias, examenes. Que vaya a ensenar.">
                  </TextInput>
               <TextInput 
               onChangeText={text=>onChangeValue('username',text)} 
               placeholder="Usuario: "
               value={values.username}
               />
               </View>
               )}
           
            </Steps.Step>
           
       
            <Steps.Step>
                {({onChangeValue,values})=>(
             <View style={styles.container}>
               <TouchableOpacity style={styles.photoContainer} onPress={this.openImg}>
               <Icon name='photo-camera' style={styles.icon}  size={60} />
               <View>
               <Text style={styles.titleText}>Identificacion</Text>
               <Text style={styles.subText}>Requerido (INE o pasaporte)</Text>
               </View>
              </TouchableOpacity> 
              <View style={styles.inputContainer}>
              <Text style={styles.titleText}>Cedula Profesional</Text>
              <Text style={styles.subText}>Requerido</Text>
              <TextInput 
              style={styles.cedulaInput}
            onChangeText={text=>onChangeValue('avatar',text)} 
            placeholder="Introduce tu numero unico de cedula: "
            value={values.avatar}
            />
              </View>
           
           
           
               </View>
                )}
            
            </Steps.Step>
        </Steps>
      </View>
      </ImageBackground>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'white',
        position: 'absolute',
        alignSelf:'center',
        width:'100%',
        height:'90%',
        marginTop:'17%',
        borderRadius:20


    },

    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        
    },
    scroll:{
      width:'100%',
      height:'100%'
    },
    imgBack:{
      flex:1,
     
    },
    inputBox:{
      borderRadius:20,
      height:'30%',
      width:'60%',
      padding:10,
      textAlign:'center',
      borderWidth:0.5,
      fontSize:10
    },
    textTitle:{
      fontWeight:'bold',
      color:'gray',
      marginBottom:'3%',
      marginTop:'5%'
    },
    searchIcon: {
      padding: 10,
  },
  photoContainer:{
    marginTop:'20%',
    flexDirection:'row',
        height:'20%',
        width:'60%',
        alignContent:'flex-start',
        
  },
  titleText:{
    fontSize:16,
    fontWeight:'bold',
    color:'black',
 
  },
  subText:{
    fontSize:12,
    fontWeight:'bold',
    color:'gray',
    opacity:0.9,
    marginTop:'3%'
   
  },
  icon:{
    marginRight:'10%'
  },
  inputContainer:{
   
    height:'20%',
        width:'60%',
        alignContent:'flex-start',
        
  },
  cedulaInput:{
    marginTop:'10%',
    borderBottomWidth:0.8
  }
  
})