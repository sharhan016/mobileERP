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
        <Text style={styles.valueText}>{'\t'}$ {props.amount}</Text>
    </View>
)
export default Info;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 5
    },
    headingText: {
        fontSize: 18,
        color: '#2c2d2e',
        paddingTop: 12,
    },
    valueText: {
        paddingTop: 12,
        fontSize: 17,
        color: '#3168cc',
        fontWeight: '700'
    },
});