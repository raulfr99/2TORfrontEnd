import * as React from 'react';
import { Text,TextInput,View, ImageBackground,StyleSheet,Picker,TouchableOpacity } from 'react-native';
import { Icon,Button,Avatar } from 'react-native-elements'

const imgFooter = require('../assets/reg.jpg');
const imgCamera = require('../assets/camara.png')

export default class RegisterProfScreen extends React.Component {
  static navigationOptions ={
    header: null
  }

  render() {
    
    return (
          <View style={styles.container}>
          
          
          <View style={styles.containerName}>
             
             <TextInput  placeholder="Nombre y apellido" placeholderTextColor="gray"
             style={styles.textInput} onChange={this.changeHandler}name="name"   /> 
           </View>
            
           <View style={styles.containerEmail}>
             
             <TextInput  placeholder="Email" placeholderTextColor="gray"
             style={styles.textInput} onChange={this.changeHandler}name="email"    /> 
           </View>

           <View style={styles.containerPassword}>
           
             <TextInput placeholder="Contrasena" placeholderTextColor="gray"
             style={styles.textInput} onChange={this.changeHandler} name="password" secureTextEntry={true}  /> 
           </View>
           <View style={styles.containerPicker}>
           <Picker
           selectedValue="Zona de preferencias"
        style={styles.picker} >
        <Picker.Item label="Matematicas" value="java" />
        <Picker.Item label="Espanol" value="js" />
      </Picker>
      </View>

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
    marginTop:'10%',
   
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
  containerOR:{
    position: 'absolute',
    bottom:0,  
    alignSelf:'center',
    height:'12%',
    width:'12%',
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