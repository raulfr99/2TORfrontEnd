import React, {PureComponent} from 'react';
import {View,StyleSheet,Button} from 'react-native';
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
                <Button title='Prev' disabled={this.props.currentIndex==0} onPress={this.props.prevStep}/>
                {this.props.isLast ?(
                     <Button title='Submit'  onPress={this.props.onSubmit}/>
                ): (<Button title='Next'  onPress={this.props.nextStep}/>)}
               
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
       
        flexDirection:'row',
        height:60,
        alignItems:'center',
        justifyContent:'space-around'
    }
})

