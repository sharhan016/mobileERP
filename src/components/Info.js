import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";

const WIDTH = Dimensions.get('screen').width - 20;

const Info = (props) => {
    let money = props.amount.toString()
    let amount = ''
    if(money.slice(0,1) == '-'){
        amount = money.slice(1,15)
    }
    else{
        amount = money
    }
    return(
        <View style={styles.container}>
            <Text style={styles.headingText}> {props.line1} {props.line2}</Text>
            <View style={{width: 10}}></View>
            <Text style={styles.valueText}>{'\t'} {'$'+amount}</Text>
        </View>
    )
}
export default Info;

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        height: 60,
        paddingBottom: 5,
        width: WIDTH / 2,
        paddingRight: 3,
        paddingLeft: 3,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: '#c9dcfc'

    },
    headingText: {
        fontSize: 16,
        color: '#2c2d2e',
        //paddingTop: 10,
    },
    valueText: {
        //paddingTop: 5,
        fontSize: 17,
        color: '#3168cc',
        fontWeight: '700'
    },
});