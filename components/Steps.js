import React, {PureComponent} from 'react';
import {View, Text,StyleSheet,Button,Alert} from 'react-native';
import Step from './Step'


class Steps extends PureComponent {
    static Step = props => <Step {...props} />;
    state = { 
        index:0,
        values:{
            ...this.props.initialValues
        }
     }
     _nextStep = () =>{
         if(this.state.index !== this.props.children.length - 1 ){
            this.setState(prevState=>({
                index: prevState.index+1,
            }));
         }
         
     }
     
     

     _prevStep = () =>{
        if(this.state.index !== 0 ){
            this.setState(prevState=>({
                index: prevState.index-1,
            }));
         }
     }
     _onChangeValue = (name,value) =>{
        this.setState(prevState=>({
            values:{
                ...prevState.values,
                [name]:value,
            }
        }))
    }

    _onSubmit = () => {
        
    
        const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/register-2tores/'
        
      

        const data = new FormData();
        data.append("email",this.state.values.email)
        data.append("name_lastname",this.state.values.name)
        data.append("password",this.state.values.password)
        data.append("profile_photo",this.state.values.image_profile)
        data.append("description",this.state.values.description)
        data.append("tags",this.state.values.tags)
        data.append("identificacion",this.state.values.identificacion)
        data.append("cedula",this.state.values.cedula)

        fetch(endPoint, {
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
            
              if (response.status == '201') {
                Alert.alert(response.data.success)
                
              }
              else if (response.status == '403') {
                alert(response.data.detail)
              }
              else if (response.status == '400') {
                if(response.data.email && response.data.name_lastname){
                  Alert.alert(''+response.data.email+'\n'+response.data.name_lastname)
                  this.state.state=(response.data.email+'\n'+response.data.name_lastname)
                 
                }
                else if(response.data.email){
                 Alert.alert(''+response.data.email)
                  this.state.state=(response.data.errors.email)
                
                  
                }
                else if(response.data.name_lastname){
                  Alert.alert(''+response.data.name_lastname)
                  this.state.state=(response.data.errors.name_lastname)
                  
                }
                else if(response.data.password){
                  Alert.alert(''+response.data.password)
                  this.state.state=(response.data.errors.password)
                  
                }
               
               
               
              }
             
              
        
            }));

    }
    render() {
        return (
            <View style={styles.container}>
                {React.Children.map(this.props.children,(el,index)=>{
                    if(index === this.state.index){
                        return React.cloneElement(el,{
                            currentIndex: this.state.index,
                            nextStep: this._nextStep,
                            prevStep: this._prevStep,
                            isLast: this.state.index === this.props.children.length - 1,
                            onChangeValue:this._onChangeValue,
                            values:this.state.values,
                            onSubmit:this._onSubmit
                        })
                    }
                    return null;
                })}
            </View>
        );
    }
}

export default Steps;
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flex:1,
        
       
       
    }
})

