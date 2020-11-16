import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native';
import { Icon } from 'react-native-elements'


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      fullData:[],
      user:''
    };
  }
  componentDidMount(){
    this.getUserData()
    this.getChatData()

  }
  getUserData = async () =>{
    this.setState({id:await AsyncStorage.getItem('id')})
    this.setState({id:await AsyncStorage.getItem('user')})
  }
  

  getChatData(){
    const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-messages-2tor/'

    let collection = {}
    collection.id_2tor = '5faa99aa5bb648523a97ffae'

    fetch(endPoint, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((resJson)=>{
      this.setState({
        
        fullData:resJson.messages
       
      })
    }).catch(error=>{
      this.setState({error,loading:false})
    })
    
  }

  _renderItem = ({item,index}) =>{
    console.log(item)
    return (
      <View>
      {this.state.user == 'false' ? (<Text>asd</Text>)
      :(
        <TouchableOpacity style={styles.cardHome} onPress={()=>this.props.navigation.navigate('ChatMessages',{data:item})}>
        <Image style={styles.imgAvatar} source={{uri:item.profile_photo_2tor}}/>
          <Text>{item.name_lastname_2tor}</Text>
          
          <Icon
          name='forward' />
        </TouchableOpacity>

      )}
      </View>
      
    )
  } 

  render() {
    
    return (
      <View style={styles.container}>
        <FlatList style={styles.container} data={this.state.fullData} keyExtractor={(item,index)=>index.toString()} renderItem={this._renderItem}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    flex:1,
    backgroundColor:'white'
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
 
  backgroundColor:'white',
  alignContent:'center',
  justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row'
 
  
}
})
