import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Keyboard, Animated, ToastAndroid, ImageBackground, StatusBar, ActivityIndicator } from "react-native";
import Button from '../components/Button';
import colors from '../config/colors';
import logo from '../assets/images/ranam-logo.png';
import Feather from 'react-native-vector-icons/Feather';

const WIDTH = Dimensions.get('screen').width;

class LoginPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = {
            showPass: true,
            loading: false,
            press: false,
            username: '',
            password: '',
            isUserLoggedIn: '1',
            topPadding: 80
        };
        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(120);
    }
    componentDidMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    keyboardDidShow = (event) => {
        let height = event.endCoordinates.height - 150;
        console.log('inside didShow', height)
        this.setState({ topPadding: 20 });
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: height,
            }),
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: 110,
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
    showPass = () => {
        if (this.state.press == false) {
            this.setState({ showPass: false, press: true })
        } else {
            this.setState({ showPass: true, press: false })
        }
    }
    getUserId = (id) => {
        this.setState({ username: id })
    }
    getPassword = (pass) => {
        this.setState({ password: pass })
    }

    submit = () => {
        const { user, pass } = this.state;
        console.log('USERNAME AND PASSWORD', user, pass )
        this.props.navigation.navigate('Dashboard')
    }
    render() {
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]} >
                <StatusBar hidden={true} />
                <View style={{ paddingVertical: this.state.topPadding }}></View>
                <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
                <View style={{ paddingVertical: 40 }}></View>

                <View>
                    <Feather name={'user'} size={24} color={colors.LoginButton} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={this.getUserId}
                        value={this.state.username}
                        style={styles.inputContainer}
                        placeholder={'Username'}
                        placeholderTextColor={colors.LoginButton}
                        underlineColorAndroid='transparent'
                        keyboardType='email-address'
                        //returnKeyType='go'
                    />
                </View>

                <View style={{ paddingVertical: 10 }}></View>

                <View>
                    <Feather name={'lock'} size={24} color={colors.LoginButton} style={styles.inputIcon} />
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={this.getPassword}
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

                <View style={{ paddingVertical: 20 }}></View>
                <Button onPress={this.submit} label='Login' style={styles.buttonLogin} textStyle={{ fontSize: 15, fontWeight: '600', color: colors.WHITISH }} />

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
        fontSize: 13,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        //color: colors.INPUT_LABEL,
        //color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25,
        paddingLeft: 45
    },
    logo: {
        width: 120,
        height: 120,
    },
    buttonLogin: {
        width: WIDTH - 80,
        borderRadius: 20,
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