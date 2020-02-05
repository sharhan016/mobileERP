import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
const WIDTH = Dimensions.get('screen').width;

const BoxInfo = (props) => (
    <View>
    <View style={styles.horizontalView}>
            <Text style={styles.subtitle}>{props.label1}</Text>
            
        </View>
        <View style={{height: 7}}></View>
        <View style={styles.horizontalView}>
            <Text style={styles.textStyle}>{props.label}</Text>
            <Text style={styles.textStyle}>{props.amount}</Text>
        </View>
        {/* <View style={styles.horizontalView}>
            <Text style={styles.textStyle}>{props.label2}</Text>
            <Text style={styles.textStyle}>{props.amount2}</Text>
        </View> */}
        </View>
        )
    export default BoxInfo;
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
            fontSize: 17
    },
    headingTextStyle: {
            fontSize: 18
    },
    horizontalView: {
            flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 15,
        justifyContent: 'space-between'
    },
    cardHeading: {
            alignItems: 'center',
        width: WIDTH - 50,
    },
    title: {
            textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
      },
      subtitle: {
            textAlign: 'center',
        fontSize: 19,
        fontWeight: '300',
        textDecorationLine: 'underline',
        //marginBottom: 10,
        marginTop: 10
      },
});