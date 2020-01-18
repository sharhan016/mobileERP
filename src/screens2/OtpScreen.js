import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FormTextInput from "../components/FormTextInput";
import Button from "../components/Button";


class OtpScreen extends Component {
    state = {  }
    static navigationOptions  = ({ navigation }) =>({header:null}); 
    render() {
        return (
            
            <View style={styles.container}>
                <View style={{height: 150}}></View>
                <View style={styles.heading}>
                <Text style={styles.headingText}>Please Enter  One Time Password</Text>
                </View>
                <View style={{height: 50}}></View>
                <FormTextInput 
                placeholder='One Time Password'
                keyboardType="numeric"
                />
                <Button style={{width: "20%"}} label='SUBMIT' onPress={this.handleLoginPress} />
            </View>
            
            // <View style={styles.heading}>
            //     <Text>Please Enter the One Time Password</Text>
            // <View style={styles.container}>
                

                // <FormTextInput 
                // placeholder='One Time Password'
                // keyboardType="numeric"
                // />
                // <View style={styles.padding}></View>
                // <View style={{width: "50%"}}>
                // <Button label='SUBMIT' onPress={this.handleLoginPress} />
                // </View>
            // </View>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor:'#fff'
        //backgroundColor:'#E7E2C5'
    },
    text: {fontSize: 25},
    padding: {
         padding: 10,   
        },
        heading:{
            //flex:3,
            alignItems: 'center',
            //backgroundColor: '#ddd',
            paddingBottom: 100,
        },
        headingText:{
            fontSize: 18,
            fontWeight: "500"
        }
});

export default OtpScreen;