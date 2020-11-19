import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,Alert,ScrollView,TouchableOpacity,Image,FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Card, ListItem, Icon } from 'react-native-elements'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      id:'',
      searchesCount:'',
      busquedaReciente:'',
      fullData:[]
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
    if(await AsyncStorage.getItem('busquedaReciente')==null){

    }
    else{
      this.getData( await AsyncStorage.getItem('busquedaReciente'))
    }
   
    
    
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

  getData =  (search) =>{
    
    const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/busqueda/'

    let collection = {}
    collection.search = search,
    collection.api_data = 1
    
    fetch(endPoint, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((resJson)=>{
      this.setState({
        
        fullData:resJson.api_data
      })
    }).catch(error=>{
      this.setState({error,loading:false})
    })
    console.log('x:'+this.state.data)
    
  }

  _renderItem = ({item,index}) =>{
    console.log(item)
    return (
      <TouchableOpacity style={styles.cardHome}>
         <Image style={styles.imgAvatar} source={{uri:item.profile_photo}}/>
           <Text>{item.name_lastname}</Text>
           
    <Text style={{color:'gray'}}>{item.tags}</Text>
         </TouchableOpacity>
    )
  } 
  render() {
    
    return (
     
      <View style={styles.container}>
      <ScrollView >
        
      <View>
       
       
        {this.state.user === 'false' ?

         (
         <View>
            <Text style={styles.textTitle}>Para Ti:</Text>
         
         <FlatList style={styles.container} data={this.state.fullData} keyExtractor={(item,index)=>index.toString()} renderItem={this._renderItem}
         horizontal={true}
         />
         
         
         
         </View>
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
    margin:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    marginTop:'5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  textSearch:{
    fontSize:18,
    padding:20,
   
    

  }
})