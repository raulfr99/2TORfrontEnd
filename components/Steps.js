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
        
        Alert.alert(JSON.stringify(this.state.values))
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

