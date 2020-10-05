import * as React from 'react';
import { Text,TextInput,View, ImageBackground,StyleSheet,TouchableOpacity, Picker,Alert } from 'react-native';
import { Icon,Button,Avatar } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts';

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
        showAlert: false,
        state:''

        
    }
}
  static navigationOptions ={
    header: null
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
  let collection={}
  collection.username=this.state.name,
  collection.email=this.state.email,
  collection.password=this.state.password
  
  console.log(collection)
  
  var url = 'http://127.0.0.1:8000/auth/register/';

  fetch(url, {
    method: 'POST', 
    body: JSON.stringify(collection), 
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json().then(data => ({
    data: data,
    status: res.status
  }))
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response.status, response.data)
      if (response.status == '201') {
        this.state.state=('Se ha enviado un correo de confirmacion a:'+'\n'+response.data.data.email)
        this.showAlert()
        window.location.reload(false);
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
    const {showAlert} = this.state;
    return (
          <View style={styles.container}>
          
          
          <View style={styles.containerName}>
             
             <TextInput  placeholder="Nombre y apellido" placeholderTextColor="gray"
             style={styles.textInput} onChange={this.changeHandler}name="name" value={name}  /> 
           </View>
            
           <View style={styles.containerEmail}>
             
             <TextInput  placeholder="Email" placeholderTextColor="gray"
             style={styles.textInput} onChange={this.changeHandler}name="email"  value={email}  /> 
           </View>

           <View style={styles.containerPassword}>
           
             <TextInput placeholder="Contrasena" placeholderTextColor="gray"
             style={styles.textInput} onChange={this.changeHandler} name="password" secureTextEntry={true} value={password} /> 
           </View>
           <View style={styles.containerPicker}>
           <Picker
           selectedValue="Zona de preferencias"
        style={styles.picker} >
        <Picker.Item label="Matematicas" value="java" />
        <Picker.Item label="Espanol" value="js" />
      </Picker>
      </View>
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Advertencia"
          message={this.state.state}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        

           <View style={styles.containerSignIn}>
             <TouchableOpacity
                     style={styles.buttonLogin}
                     onPress={()=>this.submit()}
                     underlayColor='#fff'>
                     <Text style={styles.loginText}>Entrar</Text>
           </TouchableOpacity>
           </View>
            
            
                             
            
          
          </View>        
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'stretch',
    width:'100%',
    height:'100%',
    marginTop:'10%'
  },
  avatarCamara:{
    width:'25%',
    height:'20%',
    alignSelf:'center',
    marginTop:'10%'
  },
  containerRegister:{
    flex:2,
    marginLeft:'3%',
    marginRight:'3%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  
  containerSignIn:{
    height: 50,
    marginLeft:'12%',
    marginRight:'12%',
    marginTop:'9%'
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
    marginTop:'10px',
    alignSelf:'center',
    

  },
  buttonLogin:{
    backgroundColor:'#22d48a',
    borderRadius:5,
    alignItems:'center',
    paddingTop:'20px',
    paddingBottom:'20px',
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
    color:'black',
   
    color:'gray',
    borderStyle:'none'
   
  }
})