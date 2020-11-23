

import React, { Component,useState,useEffect } from 'react';
import {StatusBar} from 'expo-status-bar'
import { View, Text,StyleSheet,FlatList,Button,TextInput, TouchableHighlight, Alert,KeyboardAvoidingView,YellowBox,ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class ChatMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data:null,
        fullData:[],
        extraData:[],
        user:'',
        textMsg:''
    };
  }
  async componentDidMount(){
    
   await this.getProfileData()
   this.getMessages(this.props.navigation.state.params)
   this.getMessagesExtra(this.props.navigation.state.params)
  

   this.componentDidMount()
    
    
 
  }
  
  
 saveData =  () =>{
     this.setState({data:this.props.navigation.state.params})
  }
  getProfileData = async () => {
    this.setState({user: await AsyncStorage.getItem('user')})
    
    
  }
 
  getMessages(data){
    
      const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-data-messages/'
       
      let collection = {}
      collection.id_2tor = data.data.id_2tor,
      collection.id_alumno = data.data.id_alumno

      fetch(endPoint, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then((resJson)=>{
        this.setState({
            fullData:resJson.datamessages
        })
      }).catch(error=>{
        this.setState({error,loading:false})
      })
      
  }

  getMessagesExtra(data){
    
    const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-data-messages/'
     
    let collection = {}
    collection.id_2tor = data.data.id_2tor,
    collection.id_alumno = data.data.id_alumno

    fetch(endPoint, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((resJson)=>{
      this.setState({
         extraData:resJson.datamessages
      })
    }).catch(error=>{
      this.setState({error,loading:false})
    })
    
}
sendMessage(data){
  var endPoint;
  if(this.state.user=='false'){
     endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/create-messages-alumno/'
  }
  else{
    endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/create-messages-2tor/'
  }
  
 
  
  let collection = {}
  collection.id_2tor = data.data.id_2tor,
  collection.id_alumno =  data.data.id_alumno,
  collection.message = this.state.textMsg
  this.setState({textMsg:''})
  fetch(endPoint, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(collection), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then((resJson)=>{
    
       console.log(resJson)
    
  }).catch(error=>{
    this.setState({error,loading:false})
  })
  
}

  _renderItem = ({item,index}) =>{
   
    
    return (
        <View>
          {this.state.user === 'false' ? (
              <View>
            {item.user === 1 ?(<View style={styles.containerAlumno}><Text style={styles.textAlumno}>{item.message}</Text></View>)
        :(<View style={styles.containerTutor}><Text style={styles.textTutor}>{item.message}</Text></View>)}
        </View>
          )
          :(
            <View>
            {item.user === 0 ?(<View style={styles.containerAlumno}><Text style={styles.textAlumno}>{item.message}</Text></View>)
        :(<View style={styles.containerTutor}><Text style={styles.textTutor}>{item.message}</Text></View>)}
          </View>
          )}
        
        </View>
    )
  } 
 

  render() {
      const {state} = this.props.navigation;
      
    return (
      <KeyboardAvoidingView style={styles.container}>
        {this.state.user === 'false' ?(
            <View style={styles.userTextContainer}><Text style={styles.userText}>{state.params.data.name_lastname_2tor}</Text></View>

        ):(

          <View style={styles.userTextContainer}><Text style={styles.userText}>{state.params.data.name_lastname_alumno}</Text></View>
        )}
      
        <ScrollView  
        
        style={styles.scroll}contentContainerStyle={{flex: 1}}>
          
        <View style={styles.chatContainer}>
        <FlatList    
        extraData={this.state.extraData} 
        style={styles.container} 
        data={this.state.fullData} 
        keyExtractor={(item,index)=>index.toString()}
        renderItem={this._renderItem}
        ref={ (ref) => { this.myFlatListRef = ref } }
        onContentSizeChange={ () => { this.myFlatListRef.scrollToEnd({animated:true}) } }
        onLayout={ () => { this.myFlatListRef.scrollToEnd({animated:true}) } }
       
       
         />
       
       
       
        </View>
        </ScrollView>
        <View style={styles.inputContainer}>
      
      <TextInput placeholderTextColor='gray' style={styles.msgInput} placeholder='Escribe un mensaje...'
      onChangeText={(value)=>this.setState({textMsg:value})} value={this.state.textMsg}
    
      >

      </TextInput>
      <TouchableOpacity onPress={()=>this.sendMessage(this.props.navigation.state.params)} >
      <Icon
        name='send' 
        size={30}
        iconStyle={styles.sendButton}
        
        />
      </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({

    container:{
        width:'100%',
        height:'100%',
        flex:1,
    },
    chatContainer:{
      width:'100%',
      flex:1,
      justifyContent:'space-around',
 
    },
    userTextContainer:{
      width:'100%',
      height:'8%',
      backgroundColor:'white',
     
      justifyContent: 'center',
      opacity:0.9
      
    },
    userText:{
      alignSelf:'center',
      fontSize:18,
      fontWeight:'bold'
     
    },
    inputContainer:{
      bottom:0,
      left:0,
      width:'100%',
      height:'8%',
      marginTop:'5%',
      flexDirection:'row',
      justifyContent: 'space-evenly',
    },
    msgInput:{
      width:'85%',      
      height:'100%',
      alignSelf:'center',
      backgroundColor:'white'
      
      
    },
    sendButton:{
     
      backgroundColor:'#40E29F',
      width:'100%',
      height:'100%',
      justifyContent: 'center',
      padding:10,
      
    },
    textTutor:{
      color:'black',
      alignSelf:'flex-start',
      padding:10
    },
    textAlumno:{
      color:'white',
      alignSelf:'flex-end',
      padding:10
    },
    containerTutor:{
      alignSelf:'flex-start',
      backgroundColor:'white',
      justifyContent: 'center',
      marginRight:'2%',
      marginLeft:'2%',
      borderRadius:10
    },
    containerAlumno:{
      alignSelf:'flex-end',
      backgroundColor:'gray',
      justifyContent: 'center',
      marginLeft:'2%',
      marginRight:'2%',
      borderRadius:10
    },
   
})
