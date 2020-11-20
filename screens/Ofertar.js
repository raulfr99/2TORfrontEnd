import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,Button,TouchableOpacity,Modal,TouchableHighlight,TextInput, Alert} from 'react-native';
import { Icon} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
export default class Ofertar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        price:'',
        location:'',
        id:'',
        userCalification:'',
        min:'',
        max:''
    };
  }
  async componentDidMount(){
    await this.getProfileData()
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  getProfileData = async () => {
    
    this.setState({user: await AsyncStorage.getItem('user')})
    this.setState({id: await AsyncStorage.getItem('id')})
    const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-calification-2tor/'
    let collection = {}
    collection.id_2tor = this.props.navigation.state.params.data.id,
    fetch(endPoint, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((resJson)=>{
      this.setState({
          userCalification:resJson.search.promedio
      })
      
    }).catch(error=>{
      this.setState({error,loading:false})
    })
     
    const url = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/price-2tor/'
    let collectionPrice = {}
    collectionPrice.id_2tor = this.props.navigation.state.params.data.id,
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collectionPrice), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((resJson)=>{
      this.setState({
        min:resJson.max,
        max:resJson.min
      })
      
    }).catch(error=>{
      this.setState({error,loading:false})
    })
    
  }
  
  sendOffer = (id) => {
    const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/create-offer/'
    let collection = {}
    collection.id_2tor = id,
    collection.id_alumno=this.state.id,
    collection.price_hr = this.state.price,
    collection.class_zone = this.state.location
    fetch(endPoint, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(collection), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((resJson)=>{
      Alert.alert(''+resJson.detail)
    }).catch(error=>{
      this.setState({error,loading:false})
    })
  }

  
  

  render() {
    const {state} = this.props.navigation;
    const { modalVisible } = this.state;

    return (
      <View style={styles.container} >
          <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>{state.params.data.name_lastname} </Text>
              <Image
              style={styles.imgAvatar}
              source={{uri: state.params.data.profile_photo}}
                
                />
          </View>
        <Text style={styles.textTag}>{state.params.data.tags} </Text>
        <View style={styles.titleContainer}>
                <Icon
                name='star-border'
                size={35}
                 />
              <Text style={styles.textPromedio} >{this.state.userCalification} </Text>
              <Text style={styles.textCantidad} >${this.state.max} - ${this.state.min} / hr</Text>
          </View>
          <View style={styles.titleContainer}>
              <Text style={styles.textTitle} >Tags: </Text>
              <Icon
                name='today'
                color='#40E29F'
                size={35}
                style={{marginRight:'8%'}}
                 />
          </View>
          <View style={styles.tagsContainer}>
            <Text style={styles.textTags} >CALCULO </Text>
            <Text style={styles.textTags} >GEOMETRIA </Text>
            <Text style={styles.textTags} >ALGEBRA </Text>
          </View>
          <Text style={styles.textAc}>Acerca:</Text>
          <View style={styles.desContainer}>
    <Text style={styles.textDes}> {state.params.data.description}</Text>
         </View>
          <TouchableOpacity style={styles.button}onPress={() => {
            this.setModalVisible(true);
          }} ><Text style={styles.textButton}>Agendar</Text></TouchableOpacity>
         
          <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
        <Text style={styles.modalText}>Has una oferta a {state.params.data.name_lastname}</Text>
        <TextInput style={styles.modalInput} onChangeText={(value)=>this.setState({price:value})} placeholder="Cantidad"></TextInput>
        <TextInput style={styles.modalInput} onChangeText={(value)=>this.setState({location:value})} placeholder="Ubicacion"></TextInput>
        <View style={styles.modalButtons}>
              <TouchableHighlight
                style={styles.openButton }
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={ styles.openButton }
                onPress={() => {
                  this.sendOffer(state.params.data.id);
                }}
              >
                <Text style={styles.textStyle}>Enviar Oferta</Text>
              </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
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
    titleContainer:{
        flexDirection:'row',
        alignContent:'flex-start',
        width:'100%',
        justifyContent:'space-between',
        marginTop:'8%'
    },
    textPromedio:{
      fontSize:18,
      color:'gray',
      left:0,
      marginLeft:'-10%',
      alignSelf:'center'
    },
    textCantidad:{
      fontSize:13,
      fontWeight:'bold',
      alignSelf:'center',
      marginRight:'5%'
    },
    imgAvatar:{
        width: 70,
        height: 70,
        borderRadius: 150 / 2,
        overflow: "hidden",
        
        marginRight:'8%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
    },
    textTitle:{
        color:'black',
        fontSize:25,
        
        marginLeft:'5%'
    },
    textTag:{
        color:'gray',
        fontSize:25,
        marginLeft:'5%'
    },
    tagsContainer:{
        flexDirection:'row',
        width:'100%',
        alignSelf:'center',
        justifyContent:'space-around',
        marginTop:'5%',
       
        
    },
    textTags:{
        fontSize:13,
        borderRadius:5,
        padding:15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        
        backgroundColor:'white'
    },
    textAc:{
        color:'black',
        fontSize:25,
        marginTop:'5%',
        marginLeft:'8%'
    },
    textDes:{
        fontSize:13,
        alignSelf:'auto',
        borderRadius:5,
        marginTop:'3%',
        padding:15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation:2,
        backgroundColor:'white'
        
    },
    button:{
        width:'70%',
        height:'8%',
        backgroundColor:'#40E29F',
        borderRadius:5,
        alignSelf:'center',
        marginTop:'1%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    textButton:{
        alignSelf:'center',
        color:'white',
        fontSize:20,
        padding:10
    },
    desContainer:{
        width:'80%',
        alignSelf:'center',
        justifyContent:'flex-start'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(100,100,100, 0.8)',
        padding: 20,
      },
      modalView: {
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
        backgroundColor: "#40E29F",
        borderRadius: 20,
        padding: 15,
        elevation: 2,
        margin:'5%'
        
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight:'bold'
      },
      modalInput:{
          borderBottomWidth:0.6,
          marginBottom:'10%',
          padding:15,
         
         
          
      },
      modalButtons:{
        flexDirection:'row',
        alignContent:'flex-start',
      
        justifyContent:'space-between',
      }
})
