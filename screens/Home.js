import * as React from 'react';
import { Text,TextInput,View, ImageBackground,StyleSheet } from 'react-native';
import { Icon,Button,Header } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        const token = this.getStorageValue()
        //const token = AsyncStorage.getItem("token")
        let loggedIn = true
        if(token==null){
            loggedIn = false
        }
        this.state={
            loggedIn
        }
    }
  static navigationOptions ={
      
    header: null
  }
  async getStorageValue(){
    var value = await AsyncStorage.getItem('cuadra')
    return value
  }

  render() {
      const pressHandler = () =>{
      
        AsyncStorage.removeItem('token')
        window.location.reload(false);
       
      }
  
      if(this.state.loggedIn === false){
        this.props.navigation.navigate('Test')
    }
    return (
          <View style={styles.container}>
            
            <Header 
            
    
  centerComponent={{ text: '2TOR', style: { color: 'white' } } }
  rightComponent={{ icon: 'search', color: 'black' }}
/>
      <View style={styles.tabsContainer}>
        <View style={styles.tab}><Text style={styles.tabText}>Home</Text></View>
        <View style={styles.tab}><Text style={styles.tabText}>Chats</Text></View>
        <View style={styles.tab}><Text style={styles.tabText}>Notificaciones</Text></View>
        <View style={styles.tab}><Text style={styles.tabText}>Perfil</Text></View>

      </View>
      <View style={styles.contentContainer}>
        <Text>Hola 2Tor!</Text>
      <Button title="LogOut"style={styles.buttonLog} onPress={pressHandler}></Button>
      </View>
                
               
          </View>        
    );
  }
}

const styles = StyleSheet.create({
  container:{
    
    width:'100%',
    height:'100%'
  },
  header:{
   
    position: 'absolute',
    backgroundColor:'white'
  },
  tabsContainer:{
    width:'100%',
    height:'5%',
    backgroundColor:'white',
    
    flexDirection: 'row'
   
  },
  tab:{
    width:'25%',
    height:'100%',
    backgroundColor:'white',
    borderBottomColor:'gray',
    borderBottomWidth:0.8

  },
  tabText:{
    color:'gray',
    padding:10,
    fontSize:10,
    alignSelf:'center',
    fontWeight:'bold'
  },
  contentContainer:{
    height:'100%',
    width:'100%',
    backgroundColor:'white'
  },
  buttonLog:{
    marginTop:'10%',
    alignSelf:'center',
    width:'30%'
  }
})