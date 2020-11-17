import React, { Component } from 'react';
import { View, Text,FlatList,TouchableOpacity,Image,StyleSheet, Alert,Button,Modal,TouchableHighlight} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements'

export default class Ofertas extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id:'',
        data:[],
        modalVisible: false,
        modalData:[]
    };
  }

  setModalVisible = (visible,item) => {
    this.setState({ modalVisible: visible });
    this.setState({modalData:item})
  }

  componentDidMount(){
    this.getProfileData()
    this.getOffers()
  }
  getProfileData = async () => {
    this.setState({id:await AsyncStorage.getItem('id')})
    
  }

  getOffers = () => {
      const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/get-offer/'
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
        
        data:resJson.offers
       
      })
    }).catch(error=>{
      this.setState({error,loading:false})
    })
    console.log('x:'+this.state.data)
  }
  
  _renderItem = ({item,index}) =>{
    console.log(item)
    return (
      <View>
      {item.status === 0 ?(
        <TouchableOpacity style={styles.offer} onPress={()=>this.setModalVisible(true,item)} >
          <Text style={styles.offerText}>Oferta recibida</Text>
          
          <View style={styles.offerContainer}><Text style={styles.firstText}>Precio ofertado:</Text><Text style={styles.firstText}>Zona de clase:</Text></View>
          <View style={styles.offerContainer}><Text style={styles.secondText}>{item.price_hr} $</Text><Text style={styles.secondText}>{item.class_zone}</Text></View>
        </TouchableOpacity>

      ):(
        null

      )}
      </View>
    )
  } 

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.container}>
          <Text style={styles.titleText}>Tus ofertas iran apareciendo aqui</Text>
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
              <View style={styles.firstContainer}>
                <Text style={styles.modalTextT}>Oferta</Text>
              <Icon
              style={styles.iconModal}
               name='close' 
               size={35}
               onPress={()=>this.setModalVisible(!modalVisible)}
               />
              </View>
              <View>
                <Text>Nombre</Text>
              </View>
              <View style={styles.secondContainer}>
        <Text style={styles.textModalP}>{this.state.modalData == null ? ( null ) 
                     : ( this.state.modalData.price_hr )} / hr</Text>
              
              
              <Text style={styles.textModalP}>Zona de Clase</Text>
              
              <Text style={styles.textModalZ}>{this.state.modalData == null ? ( null ) 
                     : ( this.state.modalData.class_zone )}</Text>
             
              </View>
              
              <View style={styles.thirdContainer}>
              <TouchableOpacity style={styles.firstButton} >
                <Text style={{alignSelf:'center',padding:20,fontWeight:'bold',fontSize:17}}>Contraofertar</Text>
              </TouchableOpacity>
              <View style={styles.thContainer}>
              <TouchableOpacity style={styles.secondButton}>
                <Text style={{color:'#40E29F',alignSelf:'center',fontWeight:'bold',fontSize:17}}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.thirdButton}>
                <Text style={{color:'#d1132c',alignSelf:'center',fontWeight:'bold',fontSize:17}}>Rechazar</Text>
              </TouchableOpacity>
              </View>
              
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
        backgroundColor:'white',
        
       
    },
    offer:{
        width:'100%',
        alignContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:'2%',
        borderBottomColor:'#40E29F',
        borderBottomWidth:0.6,
        
        
    },
    titleText:{
        alignSelf:'center',
        fontSize:20,
        color:'gray',
        marginBottom:'5%',
       
    },
    firstText:{
      alignSelf:'center',
      fontSize:12,
      color:'gray'
    },
    offerContainer:{
      flexDirection:'column-reverse',
      padding:10,
      width:'35%',
      
      
    },
    secondText:{
      fontSize:15,
      alignSelf:'flex-end',
      fontWeight:'bold',
      color:'gray'
    },
    offerText:{
      fontSize:18,
      fontWeight:'bold',
      color:'gray'
    },
    centeredView: {
      flex: 1,
      
      justifyContent: "center",
      alignItems: "center",
      height:'100%',
     
      
    },
    modalView: {
      
      position: 'absolute',
      bottom:0,
      left:0,
      backgroundColor: "white",
      
     
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height:'85%',
     
      width:'100%'
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
    firstContainer:{
      flexDirection:'row',
      width:'100%',
      alignContent:'space-between',
      alignItems:'center',
      justifyContent:'space-between'
    },
    modalTextT:{
      fontSize:25,
      fontWeight:'bold',
      padding:30
    },
   
    iconModal:{
      padding:30,
      
    },
    secondContainer:{
      flexDirection:'column',
      width:'100%'
    },
    textModalP:{
      alignSelf:'flex-end',
      marginRight:'10%',
      fontSize:16,
      padding:10
    },
    textModalZ:{
      alignSelf:'flex-end',
      marginRight:'10%',
      fontSize:16,
      fontWeight:'bold',
      padding:10,
      backgroundColor:'#40E29F',
      color:'white',
      borderRadius:20
    },
    
   
    thirdContainer:{
      flexDirection:'column',
      height:'30%',
      width:'100%',
      position: 'absolute',
      bottom:0,
      left:0,
     
      
     
    },
    thContainer:{
      width:'100%',
      height:'100%',
      flexDirection:'row',
     

    },
    firstButton:{
     
      alignSelf:'center',
      borderWidth:0.2,
      width:'100%',
      height:'40%',
      padding:5,
      marginTop:'5%',
      borderColor:'gray'
    },
    secondButton:{
      width:'50%',
      alignContent:'center',
      justifyContent:'center',
      borderWidth:0.2,
      height:'50%',
      borderColor:'gray'
     
    },
    thirdButton:{
      width:'50%',
      alignContent:'center',
      justifyContent:'center',
      borderWidth:0.2,
      height:'50%',
      borderColor:'gray'
     
    }
})