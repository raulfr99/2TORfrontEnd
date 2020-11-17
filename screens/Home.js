import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,Alert,ScrollView,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, ListItem, Icon } from 'react-native-elements'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      id:'',
      searchesCount:''
    };
  }
  async componentDidMount(){
    this.getProfileData()
    if(await AsyncStorage.getItem('user')==='true'){
      this.getSearchesCount(await AsyncStorage.getItem('id'))
    }
    else{

    }
   
  }
  getProfileData = async () => {
    this.setState({user: await AsyncStorage.getItem('user')})
    this.setState({id: await AsyncStorage.getItem('id')})
    
    
  }
  getSearchesCount(id){
    endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/count-searches/'

    let collection = {}
    collection.id_2tor = id

    fetch(endPoint, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((resJson)=>{
      this.setState({
        
        searchesCount:resJson.searches
       
      })
    }).catch(error=>{
      this.setState({error,loading:false})
    })

  }
  render() {
    
    return (
     
      <View style={styles.container}>
      <ScrollView >
        
      <View>
       
       
        {this.state.user === 'false' ?
         (<ScrollView horizontal={true}>
            <Text style={styles.textTitle}>Para Ti:</Text>
         <TouchableOpacity style={styles.cardHome}>
         <Image style={styles.imgAvatar} source={require('../assets/logo.png')}/>
           <Text>Raul Flores</Text>
           
           <Text style={{color:'gray'}}>Ingles</Text>
         </TouchableOpacity>
         
         </ScrollView>  
         )
        : (
        <View>
        <Text style={styles.textTitle}>Hola 2Tor!</Text>
        <Text style={styles.textSub}>Revisa tus estadisticas</Text>
        <View style={styles.searchContainer}>
            <Text style={styles.textSearch}>Han visitado tu perfil </Text>
            <Text style={styles.textSearch}>{this.state.searchesCount} usuario(s)</Text>
        </View>
        </View>
        
        )}
       
      </View>
      
      <View style={styles.cardsContainer}>
        
         
      </View>
     
      </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
     
    },
    textTitle:{
      color:'#636363',
      fontSize:25,
      padding:20,
      
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
  },
  textSub:{
    marginLeft:'6%',
    color:'gray'
  },
  searchContainer:{
    flexDirection:'row',
    alignSelf:'center',
    backgroundColor:'white',
    borderRadius:5,
    width:'90%',
    marginTop:'5%'

  },
  textSearch:{
    fontSize:18,
    padding:20,
   
    

  }
})