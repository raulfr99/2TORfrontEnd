import React, { Component } from 'react';
import { View, Text,StyleSheet,Image,Button,TouchableOpacity,Modal,TouchableHighlight,TextInput, Alert} from 'react-native';
import { Icon} from 'react-native-elements'

export default class Ofertar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        price:'',
        location:''
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  
  sendOffer = (id) => {
    const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/create-offer/'
    let collection = {}
    collection.id_2tor = id,
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
      console.log('Oferta creada: '+resJson)
    }).catch(error=>{
      this.setState({error,loading:false})
    })
  }

  render() {
    const {state} = this.props.navigation;
    const { modalVisible } = this.state;

    return (
      <View style={styles.container}>
          <View style={styles.titleContainer}>
              <Text style={styles.textTitle}>{state.params.data.name_lastname} </Text>
              <Image
              style={styles.imgAvatar}
              source={{uri: state.params.data.profile_photo}}/>
          </View>
        <Text style={styles.textTag}>{state.params.data.tags} </Text>
        <View style={styles.titleContainer}>
              <Text >Califiacion </Text>
              <Text >Precio Prom. </Text>
          </View>
          <View style={styles.titleContainer}>
              <Text style={styles.textTitle} >Tags: </Text>
              <Icon
                name='today'
                color='#40E29F'
                size={35}
                style={{marginRight:'8%'}} />
          </View>
          <View style={styles.tagsContainer}>
            <Text style={styles.textTags} >CALCULO </Text>
            <Text style={styles.textTags} >GEOMETRIA </Text>
            <Text style={styles.textTags} >ALGEBRA </Text>
          </View>
          <Text style={styles.textAc}>Acerca:</Text>
          <View style={styles.desContainer}>
          <Text style={styles.textDes}>{state.params.data.description}</Text>
         </View>
          <TouchableOpacity style={styles.button}onPress={() => {
            this.setModalVisible(true);
          }} ><Text style={styles.textButton}>Agendar</Text></TouchableOpacity>
         
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
        backgroundColor:'white'
    },
    titleContainer:{
        flexDirection:'row',
        alignContent:'flex-start',
        width:'100%',
        justifyContent:'space-between',
        marginTop:'8%'
    },
    imgAvatar:{
        width: 60,
        height: 60,
        borderRadius: 150 / 2,
        overflow: "hidden",
        
        marginRight:'8%'
    },
    textTitle:{
        color:'black',
        fontSize:25,
        
        marginLeft:'8%'
    },
    textTag:{
        color:'gray',
        fontSize:25,
        marginLeft:'8%'
    },
    tagsContainer:{
        flexDirection:'row',
        alignContent:'space-between',
        width:'70%',
        alignSelf:'center',
        justifyContent:'space-between',
        marginTop:'5%'
    },
    textTags:{
        fontSize:15,
        fontWeight:'normal',
    },
    textAc:{
        color:'black',
        fontSize:25,
        marginTop:'8%',
        marginLeft:'8%'
    },
    textDes:{
        fontSize:12,
        alignSelf:'auto',
       
        marginTop:'3%',
        
    },
    button:{
        width:'50%',
        height:'8%',
        backgroundColor:'#40E29F',
        borderRadius:15,
        alignSelf:'center',
        marginTop:'5%'
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
        marginTop: 22
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
