import React, {PureComponent} from 'react';
import {View, Text,StyleSheet,Button,Alert} from 'react-native';
import Step from './Step'
import AwesomeAlert from 'react-native-awesome-alerts';


class Steps extends PureComponent {
    static Step = props => <Step {...props} />;
    state = { 
        index:0,
        values:{
            ...this.props.initialValues
        },
        showAlert:'false',
        alertMsg:''
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
      
    _onSubmit = () => {
        
       
        const endPoint = 'http://2tor-pruebas.eba-39fqbkdu.us-west-1.elasticbeanstalk.com/auth/register-2tores/'
        
      

        const data = new FormData();
        data.append("email",this.state.values.email)
        data.append("name_lastname",this.state.values.name)
        data.append("password",this.state.values.password)
        data.append("profile_photo",{uri:this.state.values.image_profile.imageUri,name:this.state.values.image_profile.fileName,type:this.state.values.image_profile.type})
        data.append("description",this.state.values.descripcion)
        data.append("tags",this.state.values.tags)
        data.append("identificacion",{uri:this.state.values.identificacion.imageUri,name:this.state.values.identificacion.fileName,type:this.state.values.identificacion.type})
        data.append("cedula",this.state.values.cedula)

        fetch(endPoint, {
            method: 'POST', 
            body: data, 
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            }
          }).then(res => res.json().then(data => ({
            data: data,
            status: res.status,
           
          }))
            .catch(error => console.error('Error:', error))
            .then(response => {
              console.log(response)
              if (response.status == '201') {
                this.setState({alertMsg:response.data.success})
                this.showAlert()
                
                
              }
              else if (response.status == '403') {
                alert(response.data.detail)
              }
              else if (response.status == '400') {
                if(response.data.email && response.data.name_lastname){
                  this.setState({alertMsg:response.data.email})
                this.showAlert()
                
                 
                }
                else if(response.data.email){
                  this.setState({alertMsg:response.data.email})
                  this.showAlert()
                
                  
                }
                else if(response.data.name_lastname){
                  this.setState({alertMsg:response.data.name_lastname})
                this.showAlert()
                  
                }
                else if(response.data.password){
                  this.setState({alertMsg:response.data.password})
                  this.showAlert()
                  
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

export default Steps;
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flex:1,
        
       
       
    }
})

