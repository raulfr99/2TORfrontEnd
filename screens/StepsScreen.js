import React, { Component } from 'react';
import { View, Text ,StyleSheet,TextInput} from 'react-native';
import Steps from '../components/Steps'
export default class StepsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.root}>
          
        <Steps initialValues={{
            username:'',
            email:'',
            avatar:''
        }}>
            
           <Steps.Step>
               {({onChangeValue,values})=>(
                <View style={styles.container}>
               <TextInput 
               onChangeText={text=>onChangeValue('username',text)} 
               placeholder="Usuario: "
               value={values.username}
               />
               </View>
               )}
           
            </Steps.Step>
           
            <Steps.Step>
                {({onChangeValue,values})=>(
                <View style={styles.container}>
             <TextInput 
             onChangeText={text=>onChangeValue('email',text)} 
             placeholder="email: "
             value={values.email}
             />
               </View>
                )}
            
            </Steps.Step>
            <Steps.Step>
                {({onChangeValue,values})=>(
             <View style={styles.container}>
            <TextInput 
            onChangeText={text=>onChangeValue('avatar',text)} 
            placeholder="Avatar: "
            value={values.avatar}
            />
               </View>
                )}
            
            </Steps.Step>
        </Steps>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    root:{
        flex:1
    },

    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    }
})