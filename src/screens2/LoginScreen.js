import React, { Component } from 'react';
import { Image, StyleSheet, View, Text } from "react-native";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
//import imageLogo from "../assets/images/logo.png";
import colors from "../config/colors";
//import strings from "../config/strings";




class LoginScreen extends Component {

    static navigationOptions  = ({ navigation }) =>({header:null}); 
    state = { mobile: '' };

  handleMobileChange = (mobile) => {
    this.setState({ mobile: mobile });
  };

  handleLoginPress = () => {
    console.log("Login button pressed");
    this.props.navigation.navigate('OtpPage');
  };

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.logoContainer}><Text>Logo Goes Here</Text></View>
          <View style={{height: 100}}></View>
        {/* <Image source={imageLogo} style={styles.logo} /> */}
        <View style={styles.form}>
          <FormTextInput
            value={this.state.password}
            keyboardType="numeric"
            onChangeText={this.handleMobileChange}
            placeholder='Mobile Number'
          />
          <Button label='Send OTP' onPress={this.handleLoginPress} />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.DODGER_BLUE,
    alignItems: "center",
    //justifyContent: "flex-start"
  },
  logo: {
    //flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    //flex: 3,
    justifyContent: "center",
    width: "80%"
  },
  logoContainer: {
      height: 200,
      width:200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ddd',
      marginTop: 30,
      borderRadius: 20
  }
});

export default LoginScreen;