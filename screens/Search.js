import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image,FlatList,Alert,Modal,TouchableHighlight} from 'react-native';
import { SearchBar,Button, ThemeConsumer} from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fullData:[],
      loading:false,
      error:null,
      search:'',
      modalVisible: false,
      modalData:[],
      idUser:'',
      valueSearch:''
    };
  }
  /*componentDidMount(){
    this.getData()
  } */
  async componentDidMount(){
    if(await AsyncStorage.getItem('user')==='false'){
     this.setState({idUser:await AsyncStorage.getItem('id')})
    }
    else{

    }
   
  }
  setModalVisible = (visible,item) => {
    this.setState({modalData:item})
    this.setState({ modalVisible: visible });
  }

  sendSearch = (id) => {
    console.log(id)
    const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/save-search/'
    let collection = {}
    collection.id_2tor = id,
    collection.id_alumno = this.state.idUser,
    fetch(endPoint, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((resJson)=>{
      console.log('Busqueda: '+resJson)
    }).catch(error=>{
      this.setState({error,loading:false})
    })
    
  }
  

   getData =  (search) =>{
    this.setState({loading:true})
    this.setState({search:search})
    AsyncStorage.setItem('busquedaReciente',search)
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
        loading:false,
        data: resJson.api_data,
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
      <TouchableOpacity style={styles.card} onPress={()=>{this.sendSearch(item.id);this.props.navigation.navigate('Ofertar',{data:item});}}>
          <Image style={styles.cardImage} source={{uri:item.profile_photo}}/>
          <View style={styles.cardContainer}>
            
    <Text style={styles.cardTitle}>{item.name_lastname}</Text>
    <Text style={styles.textSub}>Descripcion: </Text>
    <Text style={styles.cardDes}>{item.description}</Text>
    <Text style={styles.textSub}>Tag: </Text>
    <Text style={styles.cardTag}>{item.tags}</Text>
           </View>
        </TouchableOpacity>
    )
  } 
  render() {
    const { modalVisible } = this.state;
    return (
      <ScrollView contentContainerStyle={{flex:1}}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>

          
           <SearchBar
        platform="android"
        searchIcon={false}
        placeholder="Que buscas?"
        inputStyle={styles.search}
        onChangeText={(value)=>this.setState({valueSearch:value})}
        autoCorrect={false}
        value={this.state.valueSearch}
        containerStyle={styles.searchCont}
        
      />
      <TouchableOpacity style={styles.searchButton} onPress={()=>this.getData(this.state.valueSearch)}>
        <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
     
      </View>
        <FlatList style={styles.container} data={this.state.data} keyExtractor={(item,index)=>index.toString()} renderItem={this._renderItem}/>
       

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Oferta</Text>
              <Text style={styles.modalText}>{this.state.modalData.name_lastname}</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible,[]);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        
        </View>
        </ScrollView>
      
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
    search:{
      
        alignSelf:'center',
        height:'10%'
    },
    searchCont:{
      
      width:'80%',
     
      alignSelf:'center',
  },
  searchButton:{
    backgroundColor:'#40E29F',
    width:'20%',
    height:'100%',
    justifyContent: 'center',
    

  },
  searchButtonText:{
    textAlign:'center',
    color:'white',
    padding:8,
    fontWeight:'bold',
    
  },
    textList:{
        padding:25,
        fontSize:15,
        color:'black',
        
    },
    card:{
      backgroundColor:'#FFF',
      marginBottom:10,
      marginLeft:'2%',
      width:'96%',
      borderRadius:10,
      borderColor:'#40E29F',
      borderWidth:0.5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardTitle:{
      fontSize:18,
      
      
    },
    cardDes:{
      fontSize:15,
     
    },
    cardTag:{
      fontSize:15,
     
    },
    textSub:{
      fontSize:10,
      color:'gray',
    },
    cardImage:{
      width:'100%',
      height:200,
      resizeMode:'cover',
    
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      width:'100%',
      height:'100%',
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    cardContainer:{
      alignContent:'center',
      alignItems:'center'
    },
    searchContainer:{
     width:'100%',
     justifyContent:'space-around',
     flexDirection:'row',
     height:'10%',
     alignItems:'center',
     alignContent:'center'
    }
})