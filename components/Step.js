import React, {PureComponent} from 'react';
import {View,StyleSheet,Button,TouchableOpacity,Text} from 'react-native';
class Step extends PureComponent {
    state = {  }
    render() {
        return (
            <View style={styles.container}> 
                {this.props.children({
                    onChangeValue: this.props.onChangeValue,
                    values:this.props.values
                })}
                <View style={styles.buttonContainer}>
               <TouchableOpacity  disabled={this.props.currentIndex==0} onPress={this.props.prevStep}><Text style={styles.buttonText}>Paso anterior</Text></TouchableOpacity>
                {this.props.isLast ?(
                    <TouchableOpacity style={styles.button} onPress={this.props.onSubmit} ><Text style={styles.buttonText}>Enviar</Text></TouchableOpacity>
                ): (<TouchableOpacity style={styles.button} onPress={this.props.nextStep}><Text style={styles.buttonText}>Siguiente paso</Text></TouchableOpacity>)}
               
                </View>
            </View>
        );
    }
}




export default Step;
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flex:1,

    },
    buttonContainer:{
        backgroundColor:'#22d48a',
        flexDirection:'row',
        height:60,
        alignItems:'center',
        justifyContent:'space-around'
    },
    buttonText:{
       fontWeight:'bold',
       color:'white',
       fontSize:15
    }
})

