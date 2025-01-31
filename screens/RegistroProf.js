import * as React from 'react';
import { Text, TextInput, View, ImageBackground, StyleSheet, Picker, TouchableOpacity ,Alert} from 'react-native';
import { Icon, Button, Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import AwesomeAlert from 'react-native-awesome-alerts';

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
        alertMsg:'',
        showAlert:false
    }
}

showAlert = () => {
  this.setState({
    showAlert: true
  });
};


hideAlert = () => {
  this.setState({
    showAlert: false
  });
};
  
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
    console.log("81: "+JSON.stringify(this.state.image_profile))
    if(obj.name && obj.email && obj.password !== null){
      this.hideAlert()
      this.props.navigation.navigate('Steps',{data:obj})
      
    }
    else{
      this.setState({alertMsg:'No se han llenado los datos!'})
      this.showAlert()
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
      
       
        <View style={styles.containerSignIn}>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.submit()}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Siguiente</Text>
          </TouchableOpacity>
        </View>

        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Alerta!"
          message={this.state.alertMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          
          showConfirmButton={true}
         
          confirmText="Aceptar"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
    padding:20,
    width: '350%',
    alignSelf: 'center',
    marginTop: '15%',
    height:'100%',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,

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
    marginTop:'5%',
    flexDirection:'row',
    height:'20%',
    width:'60%',
    justifyContent:'center',
    alignSelf:'center'
    
        
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