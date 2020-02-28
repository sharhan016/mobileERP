import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput,Dimensions, TouchableOpacity, ToastAndroid, Keyboard, Animated, ImageBackground, StatusBar } from "react-native";
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import colors from '../config/colors';
import logo from '../assets/images/ranam-logo.png';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import * as api from '../config/api';

const TRUE = 'true'
const WIDTH = Dimensions.get('screen').width;
class LoginPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            comapanyID: this.props.navigation.getParam('ID'),
            showPass: true,
            loading: false,
            press: false,
            alias: '',
            username: '',
            password: '',
            isUserLoggedIn: '1',
            topPadding: 80
        }
        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(120);
    }

    componentDidMount() {
        //console.log('This is the ID ',this.props.navigation.getParam('ID'))
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    keyboardDidShow = (event) => {
        let height = event.endCoordinates.height - 150;
        this.setState({ topPadding: 20 });
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: height,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 120,
            }),
        ]).start();
    };

    keyboardDidHide = (event) => {
        this.setState({ topPadding: 80 });
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 120,
            }),
        ]).start();
    };

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }
    getUserId = (id) => {
        this.setState({ username: id })
    }
    getPassword = (pass) => {
        this.setState({ password: pass })
    }
    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }

    loginButton = () => {
        const { username, password, companyID } = this.state;
        console.log('In Login Btn')
        if (this.state.username != '') {
            if (this.state.password != '') {
            } else { alert('Please Enter password'); }
        } else {
            alert('Please Enter UserName');
        }
        this.setState({ loading: true });
        Keyboard.dismiss();
        //this.props.navigation.navigate('Dashboard')
        this.submit(username, password);
    }

    submit = async (user, pass) => {
        //let ali =  // #TODO:add this section dynamically
        let ali = this.props.navigation.getParam('Alias')
        let id = this.props.navigation.getParam('ID')
        let post = {
            CompanyID: id,
            username: user,
            password: pass
        }
        const headers = {
            'alias': ali
        }
        axios.post(api.USER_LOGIN, post, {
            headers: headers
        }).then(response => {
            let data = response.data.requestedData
            console.log('data',response)
            const userData = data["userData"]
            const token = data.authToken
            console.log('Token in Login Page',token)
            this.storeToken(userData, token, ali)
        }).catch(error => {
            ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
            this.setState({ loading: false });
            console.log('Error: ', error)
        })
    }
    storeToken = async (data, token, alias) => {
        try {
            await AsyncStorage.setItem(api.TOKEN, token)
            await AsyncStorage.setItem(api.USER_DATA, JSON.stringify(data))
            await AsyncStorage.setItem(api.LOGGED_IN, TRUE )
            await AsyncStorage.setItem(api.ALIAS_NAME, alias)
        } catch (error) {
            console.log('Error inside localStorage',error)
        }
        this.props.navigation.navigate("Dashboard")
    }


    render() {
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]} >
                <StatusBar hidden={true} />
                <View style={{ paddingVertical: this.state.topPadding }}></View>
                <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
                <Spacer space={50} />
                {/* <Text>Company ID:{this.props.navigation.getParam("ID")} </Text> */}
                <View>
                    <Feather name={'user'} size={24} color={colors.LoginButton} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={this.getUserId}
                        value={this.state.username}
                        autoCapitalize={"none"}
                        style={styles.inputContainer}
                        placeholder={'Username'}
                        placeholderTextColor={colors.LoginButton}
                        underlineColorAndroid='transparent'
                        keyboardType='email-address'
                    //returnKeyType='go'
                    />
                </View>

                <Spacer space={15} />

                <View>
                    <Feather name={'lock'} size={24} color={colors.LoginButton} style={styles.inputIcon} />
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={this.getPassword}
                        autoCapitalize={"none"}
                        value={this.state.password}
                        placeholder={'Password'}
                        placeholderTextColor={colors.LoginButton}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPass}
                    />
                    <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)} >
                        <Feather name={this.state.press == false ? 'eye' : 'eye-off'}
                            size={20} color={colors.WHITISH} />
                    </TouchableOpacity>
                </View>
                <Spacer space={20} />
                <Button onPress={this.loginButton} label='Login' style={styles.buttonLogin} textStyle={{ fontSize: 15, fontWeight: '600', color: colors.WHITISH }} />

            </Animated.View>

        );
    }
}
export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: colors.LoginBG
    },
    inputContainer: {
        width: WIDTH - 55,
        height: 40,
        //color: colors.LoginButton,
        borderRadius: 45,
        fontSize: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        marginHorizontal: 25,
        paddingLeft: 55
    },
    logo: {
        width: 120,
        height: 120,
    },
    buttonLogin: {
        width: WIDTH - 2 * WIDTH / 4,
        borderRadius: 12,
        backgroundColor: colors.LoginButton
    },
    inputIcon: {
        position: 'absolute',
        top: 6,
        left: 37,
        padding: 0,
        color: colors.LoginButton
    },
    btnEye: {
        position: 'absolute',
        top: 9,
        right: 40,
    },
});