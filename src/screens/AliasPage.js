import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, ActivityIndicator, Dimensions, TouchableOpacity, ToastAndroid, Keyboard, Animated, ImageBackground, StatusBar } from "react-native";
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import Indicator from '../components/Indicator';
import colors from '../config/colors';
import logo from '../assets/images/ranam-logo.png';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import * as api from '../config/api';


const WIDTH = Dimensions.get('screen').width;

class AliasPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = {
            showPass: true,
            loading: false,
            press: false,
            alias: '',
            username: '',
            password: '',
            isUserLoggedIn: '1',
            topPadding: 80
        };
        this.keyboardHeight = new Animated.Value(0);
        this.imageHeight = new Animated.Value(140);
    }
    componentDidMount() {
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

    getAlias = (name) => {
        this.setState({ alias: name })
    }

    searchAlias = async () => {
        let ali = 'ap_lagnuvodb'
            fetch(api.USER_LOGIN, {
            method: 'POST',
            headers: {
                'alias': ali
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
        console.log(responseJson) ;
        })
    .catch((error) => {
      console.error(error);
    });

    }

    checkAlias = async () => {
        const { alias } = this.state;
        let ali = 'ap_aldabbousdb' //#TODO: change this 
        if(alias.length < 4){
            return alert('Please Enter valid Alias');
        }   
        this.searchAlias(ali)
    }
    searchAlias = async (alias) => {
        let mycompanies = []
        const headers = {
            'alias': alias
        }
        this.setState({loading: true})
            await axios.post(api.GET_COMPANIES, {}, { headers: headers})
           .then(response => {
               console.log(response)
            mycompanies = response.data.requestedData["myCompanies"];
            console.log('length',mycompanies.length)
            let companyId = mycompanies[0]["CompanyID"];
            console.log('companyId',companyId)
            if(mycompanies.length == 1){
                this.props.navigation.navigate("SignIn",{ ID: companyId});
            }
            else{
                this.props.navigation.navigate('Companies', {navigationData: mycompanies})
            }
            this.setState({loading: false})
           })
           .catch(error => {
            this.setState({loading: false})
            console.log('In catch BLOCK Error:',error)})
    }
    loginButton = () => {
        const { username, password, alias } = this.state;
        console.log('In Login Btn')
        if (this.state.username != '') {
            if (this.state.password != '') {
                //alert('Success')
            } else {
                alert('Please Enter password');
            }
            if (this.state.alias != '') {

            } else {
                alert('Please Enter Alias')
            }
        } else {
            alert('Please Enter UserName');

        }
        this.setState({ loading: true });
        Keyboard.dismiss();
        this.props.navigation.navigate('Dashboard')
        //this.submit(username, password, alias);
    }

    submit = async (user, pass, alias) => {
        //const { user, pass } = this.state;
        //console.log('USERNAME AND PASSWORD', user, pass )
        axios.post(api.USER_LOGIN, {
            UserName: user,
            UserPassword: pass,
            Alias: alias
        }).then(response => {
            let userData = response.userData
            const navigationParams = {
                // if neeeded
            }
            let tok = response.data.APIToken;
            let tokenID = tok.toString();
            this.storeToken(tokenID, navigationParams)
        })
            .catch(error => {
                ToastAndroid.show("Login Failed", ToastAndroid.SHORT);
                this.setState({ loading: false });
                console.log('Error: ', error)
            })
    }

    storeToken = async (token, navData) => {
        // const { userName, designation } = navData;
        // console.log('username inside storeToken ',userName)
        // try {
        //     await AsyncStorage.setItem(api.TOKEN, data)
        //     await AsyncStorage.setItem(api.USER_TYPE, type)
        //     await AsyncStorage.setItem(api.LOGGED_IN, TRUE)
        //     await AsyncStorage.setItem(api.USER_NAME,userName)
        //     await AsyncStorage.setItem(api.USER_DESIGNATION, designation)
        //     this.getToken();
        // } catch (error) {
        //     console.log(error)
        // }
        // this.setState({loading: false});
        // this.props.navigation.navigate("Dashboard", navData);
    }
    render() {
        return (
            <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]} >
                <StatusBar hidden={true} />
                <View style={{ paddingVertical: this.state.topPadding }}></View>
                <Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />
                <Spacer space={60} />

                <View>
                    <Feather name={'globe'} size={24} color={colors.LoginButton} style={styles.inputIcon} />
                    <TextInput
                        onChangeText={this.getAlias}
                        value={this.state.alias}
                        style={styles.inputContainer}
                        placeholder={'Alias'}
                        placeholderTextColor={colors.LoginButton}
                        underlineColorAndroid='transparent'
                    //keyboardType='email-address'
                    //returnKeyType='go'
                    />
                </View>

                <Spacer space={20} />
                <View>
                {this.state.loading ? <Indicator loading={this.state.loading} /> : <Button onPress={this.checkAlias} label='Search' style={styles.buttonLogin} textStyle={styles.textStyle} />}
                </View>
            </Animated.View>
        );
    }
}
export default AliasPage;

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
        width: WIDTH - 2 * WIDTH / 3.5,
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
    textStyle: {
         fontSize: 15, fontWeight: '600', color: colors.WHITISH 
    },
    btnLogin: {
        width: WIDTH - 95,
        height: 40,
        borderRadius: 25,
        backgroundColor: colors.HEADER_BLUE,
        justifyContent: 'center',
        marginTop: 20,
    },
});