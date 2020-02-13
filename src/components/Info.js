import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

const Info = (props) => (
    <View style={styles.container}>
        {console.log('INSIDE INFO COMPONENT',props.amount)}
        <Text style={styles.headingText}>{'\t'}{props.line1}  {props.line2}</Text>
        <Text style={styles.valueText}>{'\t'} {props.amount}</Text>
    </View>
)
export default Info;

const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingRight: 10,
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 5,
        borderRadius: 5
    },
    headingText: {
        fontSize: 18,
        color: '#2c2d2e',
        paddingTop: 5,
    },
    valueText: {
        paddingTop: 5,
        fontSize: 17,
        color: '#3168cc',
        fontWeight: '700'
    },
});