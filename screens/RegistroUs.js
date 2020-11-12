import * as React from 'react';
import { Text,TextInput,View, ImageBackground,StyleSheet,TouchableOpacity, Picker,Alert } from 'react-native';
import { Icon,Button,Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'

const imgFooter = require('../assets/reg.jpg');
const imgCamera = require('../assets/camara.png')

export default class RegisterUsScreen extends React.Component {
  constructor(props){
    super(props)
    /*const token = localStorage.getItem("token")

    
    if(token==null){
        loggedIn = false
    }*/
    let loggedIn = true
    this.state = {
        name:'',
        email:'',
        password:'',
        image_profile:null,
        imageUri:null,
        fileName:null,
        type:null,
        showAlert: false,
        state:'',
       

        
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
}

  changeHandler = e =>{
    this.setState({[e.target.name]:e.target.value})
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

  submit(){
    const data = new FormData();
    data.append("email",this.state.email)
    data.append("username",this.state.name)
    data.append("password",this.state.password)
    data.append("image_profile",{uri:this.state.imageUri,name:this.state.fileName,type:this.state.type})
   //data.append("image_profile",this.state.image_profile)
  let collection={}
  collection.username=this.state.name,
  collection.email=this.state.email,
  collection.password=this.state.password
  
  console.log(data)
  
  var url = 'http://2tor-env.eba-ycfehjvd.us-west-1.elasticbeanstalk.com/auth/register-alumnos/';

  fetch(url, {
    method: 'POST', 
    body: data, 
    headers:{
      "Content-Type": 'multipart/form-data',
      

    }
  }).then(res => res.json().then(data => ({
    data: data,
    status: res.status
  }))
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response.status, response.data)
      if (response.status == '201') {
        this.state.state=('Se ha enviado un correo de confirmacion a:'+'\n'+response.data.email)
        Alert.alert(
          "Registrado",
          ('Se ha enviado un correo de confirmacion a:'+'\n'+response.data.email),
          [
            {
              text: "Aceptar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Presse") }
          ],
          { cancelable: false }
        );
        
      }
      else if (response.status == '403') {
        alert(response.data.detail)
      }
      else if (response.status == '400' && response.data.errors) {
        if(response.data.errors.email && response.data.errors.username){
          this.state.state=(response.data.errors.email+'\n'+response.data.errors.username)
          this.showAlert()
        }
        else if(response.data.errors.email){
          this.state.state=(response.data.errors.email)
        
          this.showAlert()
        }
        else if(response.data.errors.username){
          this.state.state=(response.data.errors.username)
          this.showAlert()
        }
        else if(response.data.errors.password){
          this.state.state=(response.data.errors.password)
          this.showAlert()
        }
       
       
       
      }
     
      

    }));
 
  }

  render() {
    
    const {name,email, password} = this.state;
    const {showAlert,emailProp} = this.state;
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
             
             <TextInput  placeholder="Nombre y apellido" placeholderTextColor="gray"
             style={styles.textInput}  onChangeText={(value)=>this.setState({name:value})} name="name" value={name}   /> 
           </View>
            
           <View style={styles.containerEmail}>
             
             <TextInput  placeholder="Email" placeholderTextColor="gray"
             style={styles.textInput}  onChangeText={(value)=>this.setState({email:value})} name="email"  value={email}  /> 
           </View>

           <View style={styles.containerPassword}>
           
             <TextInput placeholder="Contrasena" placeholderTextColor="gray"
             style={styles.textInput} onChangeText={(value)=>this.setState({password:value})} name="password" secureTextEntry={true} value={password} /> 
           </View>
           {/*
           <View style={styles.containerPicker}>
           <Picker
           selectedValue="Zona de preferencias"
        style={styles.picker} >
        <Picker.Item label="Matematicas" value="java" />
        <Picker.Item label="Espanol" value="js" />
      </Picker>
      </View>
     */}
            
           <View style={styles.containerSignIn}>
             <TouchableOpacity
                     style={styles.buttonLogin}
                     onPress={()=>this.submit()}
                     underlayColor='#fff'>
                     <Text style={styles.loginText}>Entra</Text>
           </TouchableOpacity>
           </View>
          
            
        
            
                             
            
          
          </View>        
    );
  }
}

const styles = StyleSheet.create({
  container:{
 
    
    width:'100%',
    height:'100%',
  
   
    
  },
  
  
  
  containerSignIn:{
    height: 50,
    marginLeft:'12%',
    marginRight:'12%',
    marginTop:'8%'
  },
  containerName:{
    height: 50,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'white',
    marginLeft:'10%',
    marginRight:'10%',
   
    
  },
  containerPassword:{
    height: 50,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'white',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'2%'
  },
  containerEmail:{
    height: 50,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'white',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'2%'
  },
  containerPicker:{
    height: 50,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'white',
    marginLeft:'10%',
    marginRight:'10%',
    marginTop:'2%'
  },
  
  icon:{
    flex:1
  },
  textInput:{
    backgroundColor:'transparent',
    flex:5,
    color:'black',
    paddingLeft:'25%'
  },
  textInput:{
    backgroundColor:'transparent',
    flex:5,
    color:'black',
    
    borderBottomWidth:1,
    borderBottomColor:'gray',
    textAlign:'left'

    

  },
  containerSignIn:{
    height: 60,
    width:'30%',
    marginTop:10,
    alignSelf:'center',
    

  },
  buttonLogin:{
    backgroundColor:'#22d48a',
    borderRadius:5,
    alignItems:'center',
    paddingTop:20,
    paddingBottom:20,
    width:'350%',
    alignSelf:'center',
    marginTop:'15%'
  },
  loginText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontWeight:'bold',
    fontSize:15
  },
  picker:{
    backgroundColor:'transparent',
    flex:5,
    borderColor: 'black',
    borderBottomWidth:1,
    borderRadius: 10,
    alignSelf: 'center',
   
    color:'gray',
    
    
   
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