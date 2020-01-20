import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

const Info = (props) => (
    <View style={styles.container}>
        <Text style={styles.headingText}>{'\t'}{props.line1} {'\n'} {props.line2}</Text>
        <Text style={styles.valueText}>{props.amount}</Text>
    </View>
)
export default Info;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'space-evenly'
    },
    headingText: {
        fontSize: 18,
        color: '#2c2d2e'
    },
    valueText: {
        fontSize: 17,
        color: '#3168cc',
        fontWeight: '700'
    },
});