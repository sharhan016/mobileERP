import React, { Component } from "react";
import { Button, View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from "react-native";
//import { Icon } from 'react-native-elements';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { NavigationActions,withNavigation } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as api from '../config/api';
import colors from "../config/colors";
import AsyncStorage from '@react-native-community/async-storage';


//const SideBar = props => {
class SideBar extends Component { 
    constructor(){
        super();
        this.state={
            value: '0',
            name: 'John Doe',
            designation: 'Anthropologist'
        }
       // this.getToken();
    }
     
    componentDidMount() {
        this.getToken();
    }
    getToken = async () => {
        try {
            let data = await AsyncStorage.getItem(api.USER_DATA);
            var object = JSON.parse(data)
            // const userName = await AsyncStorage.getItem(api.USER_NAME)
            // const userDesignation = await AsyncStorage.getItem(api.USER_DESIGNATION)
            this.setState({name: object.AdminName, designation: object.Company_Name });
        } catch (error) {
            console.log(error)
        }
    }

   
     


    render() {
       
             
        return (

            <ScrollView style={styles.container}>
                {/* <ImageBackground
                    source={require('../assets/background-green.jpg')}
                    style={styles.imageBG}
                > */}
                <View style={{paddingVertical: 10}} ></View>
                    <View style={styles.drawerLogo}>
                    <Image source={require('../assets/images/ranam-logo.png')} style={styles.profile} />
                    </View>
                    <View style={{marginVertical: 10}} ></View>
                    <Text style={styles.name}>{this.state.name}</Text>
                    <Text style={styles.designation}>{this.state.designation}</Text>
                    <View style={{marginVertical: 10}} ></View>
                {/* </ImageBackground> */}
                
                <View style={styles.container}><DrawerNavigatorItems {...this.props} /></View>
                



            </ScrollView>
             
        );
    }
}

export default withNavigation(SideBar);


{/*
                
               */}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITISH
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    imageBG: {
        width: undefined,
        padding: 16,
        paddingTop: 30
    },
    profile: {
        width: 120,
        height: 120,
        //borderRadius: 40
    },
    name: {
        color: colors.DRW_TINT,
        fontSize: 18,
        fontWeight: '800',
        paddingLeft: 20,
        marginVertical: 5
    },
    designation: {
        color: colors.DRW_TINT,
        fontSize: 16,
        marginRight: 4,
        paddingLeft: 20,
        fontWeight: '500'
    },
    itemsContainer: {
        paddingTop: 5,
        margin: 5,  
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.DRW_ITEMS,
        //borderWidth: 1,
        //borderRadius: 40
        //alignItems: 'flex-start'
    },
    btnStyle: {
        height: 45,
        padding: 5,
        paddingLeft: 20,
        paddingTop: 7,
        //backgroundColor: colors.ALMOND
        //width: 60
    },
    textContainer: {
        //backgroundColor: colors.ALMOND,
        paddingBottom: 7,
        paddingLeft: 7,
        justifyContent:'center',
    },
    textStyle: {
        fontSize: 17,
        fontWeight: '600'
    },
    drawerLogo: {
        //backgroundColor: colors.DRAWER_ACTIVE,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    }
});