import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';


class LoginScreen extends Component {

    
    static navigationOptions  = ({ navigation }) =>({header:null}); 
    state = {  }
    render() {
        return (


            <View style={styles.container}>
      {/*  <Text>Enter your mobile number</Text> */}

        <TextInput
          style={{height: 40}}
          placeholder="Enter your mobile number"
          keyboardType="numeric"
          //onChangeText={(text) => this.setState({text})}
          //value={this.state.text}
        />

         {/* <Input keyboardType="numeric"/> */}
        <View style={styles.padding}></View>
        <View>
                <Button onPress={() => {
                    console.log('Button clicked');
                    this.props.navigation.navigate('OtpScreen')
                    }} title='Submit' />
            </View> 

      </View>

            
        );
    }
}


const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor:'#E7E2C5'
    },
    text: {fontSize: 25},
    padding: { padding: 10 }
});

export default LoginScreen;