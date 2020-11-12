import * as React from 'react';
import { Text, TextInput, View, ImageBackground, StyleSheet, Picker, TouchableOpacity ,Alert} from 'react-native';
import { Icon, Button, Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'

const imgFooter = require('../assets/reg.jpg');
const imgCamera = require('../assets/camara.png')

export default class RegisterProfScreen extends React.Component {
  constructor(props){
    super(props)
  
    
    this.state = {
        name:'',
        email:'',
        password:'',
        image_profile:null,
        imageUri:null,
        fileName:null,
        type:null,
    }
}
  
openImg = async()=>{
  let permission = await ImagePicker.requestCameraRollPermissionsAsync();

  if(permission.granted===false){
    return;
  }
  let picker = await ImagePicker.launchImageLibraryAsync()
  console.log(picker)
  this.setState({image_profile:picker})
  let localUri = picker.uri;
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let name = `${Math.floor((Math.random() * 100000000) + 1)+`.`+match[1]}`;
  this.setState({imageUri:localUri})
  this.setState({fileName:name})
  this.setState({type:type})
  this.state.image_profile = {'imageUri':localUri,'fileName':name,'type':type}
}

  submit = () =>{
    var obj ={}
    obj.name = this.state.name
    obj.email = this.state.email
    obj.password = this.state.password
    obj.image_profile = this.state.image_profile
    if(obj.name && obj.email && obj.password !== null){
      this.props.navigation.navigate('Steps',{name:'Raulito'})
      
    }
    else{
      Alert.alert('No se han llenado los datos')
    }
   
  }

  

  render() {

    return (
      <View style={styles.container}>

          <TouchableOpacity style={styles.photoContainer} onPress={this.openImg}>
               <Icon name='photo-camera' style={styles.icon}  size={60} />
               <View>
               <Text style={styles.titleText}>Imagen de perfil</Text>
               <Text style={styles.subText}>Presiona para elegir tu foto de perfil</Text>
               </View>
              </TouchableOpacity> 
        <View style={styles.containerName}>

          <TextInput placeholder="Nombre y apellido" placeholderTextColor="gray"
            style={styles.textInput} onChangeText={(value)=>this.setState({name:value})} name="name" />
        </View>

        <View style={styles.containerEmail}>

          <TextInput placeholder="Email" placeholderTextColor="gray"
            style={styles.textInput} onChangeText={(value)=>this.setState({email:value})} name="email" />
        </View>

        <View style={styles.containerPassword}>

          <TextInput placeholder="Contrasena" placeholderTextColor="gray"
            style={styles.textInput} onChangeText={(value)=>this.setState({password:value})} name="password" secureTextEntry={true} />
        </View>
      
        {/* 
        <View style={styles.containerSignIn}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.submit()}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Siguente</Text>
          </TouchableOpacity>
        </View>
        */}
        <View style={styles.containerSignIn}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.submit()}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Siguente</Text>
          </TouchableOpacity>
        </View>
        {/* 
        <View style={styles.stepContainer}>
          
          <View style={styles.step}>
          <TouchableOpacity style={styles.buttonStep}></TouchableOpacity>
          </View>
          <View style={styles.step}>
          <TouchableOpacity style={styles.buttonStep}></TouchableOpacity>
          </View>
          <View style={styles.step}>
          <TouchableOpacity style={styles.buttonStep}></TouchableOpacity>
          </View>
          <View style={styles.step}>
          <TouchableOpacity style={styles.buttonStep}></TouchableOpacity>
          </View>
        </View>
  */}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
   
    
    
    width: '100%',
    height: '100%',
  

  },
  
  
  containerName: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
   
    

  },
 
  containerPassword: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%'
  },
  containerEmail: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%'
  },
  containerPicker: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '2%'
  },
 
  icon: {
    flex: 1
  },
  textInput: {
    backgroundColor: 'transparent',
    flex: 5,
    color: 'black',
    paddingLeft: '25%'
  },
  textInput: {
    backgroundColor: 'transparent',
    flex: 5,
    color: 'black',

    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: 'left'



  },
  containerSignIn: {
    height: 60,
    width: '30%',
    marginTop: 10,
    alignSelf: 'center',


  },
  buttonLogin: {
    backgroundColor: '#22d48a',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: '350%',
    alignSelf: 'center',
    marginTop: '15%',

  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: 15
  },
  picker: {
    backgroundColor: 'transparent',
    flex: 5,
    backgroundColor:'transparent',
    flex:5,
    borderColor: 'black',
    borderBottomWidth:1,
    borderRadius: 10,
    alignSelf: 'center',
   
    color:'gray',
    
    
    color: 'gray',
    

  },

  buttonStep:{
    backgroundColor: '#22d48a',
    justifyContent: 'center',
    alignContent: 'center',
   
    borderRadius: 25,
    width: 30,
    height: 30,
  },
  stepContainer:{
    
    width:'100%',
    height:'5%',
    backgroundColor:'white',
    marginTop:'10%',
    flexDirection: 'row'
  },
  step:{
    width:'25%',
    height:'100%',
   
    padding:15
  },
  stepText:{
    fontSize:6,
    color:'gray',
    fontWeight:'bold',
    alignSelf:'center'

  },
  photoContainer:{
    marginTop:'10%',
    flexDirection:'row',
        height:'20%',
        width:'60%',
        alignContent:'flex-start',
        
  },
  icon:{
    marginRight:'10%'
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
})