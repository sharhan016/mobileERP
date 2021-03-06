import React from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';



const Header = (props) => {
    const { textStyle, container,leftIcon, headerText } = styles;
    let icon = {}
    if(props.back == true){
        icon = <Ionicons style= {{paddingLeft:15}} name= "md-arrow-back" size={30} color={colors.WHITE} />
    }
    else{
        icon = <Ionicons style= {{paddingLeft:15}} name= "md-menu" size={30} color='white' />
    }
    return(
        <View style={container}>
            <View style={leftIcon}>
            <TouchableOpacity onPress={props.onPress}>
            {icon}
            </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 15}}></View>
            <View style={headerText}>
            <Text style={textStyle}> {props.heading} </Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.HEADER_BLUE,
        width: "100%",
        flexDirection: 'row',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 2,
        //position: 'absolute',
        //top: 0
    },
    leftIcon: {
        justifyContent: 'flex-start',
        paddingTop: 2
    },
    textStyle: {
        fontSize: 20,
        paddingBottom: 20,
        color: 'white',
        fontWeight: '600'
    },
    headerText: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        height: 60,
        paddingRight: 20
        
    }
});
