import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';


const RoundNav = (props) => (
    <View style={styles.container}>
    <TouchableOpacity onPress={props.onPress}>
    {/* <View > */}
    <Feather name={props.iconName} size={28} style={[styles.inputIcon, props.iconStyle]} />
    {/* </View> */}
    <Text style={styles.text}>{props.heading}</Text>
    </TouchableOpacity>
</View>
    )
export default RoundNav;

const styles = StyleSheet.create({
    container: {height: 120, width: 100,padding: 15, margin: 10, alignItems: 'center', justifyContent: 'center',},
    image: {width: 50, height: 50, borderRadius: 40, borderWidth: 2, borderColor: 'green'},
    text: {paddingTop: 10, textAlign: 'center'},
    inputIcon: {backgroundColor: 'gray', padding: 20, borderRadius: 40, borderWidth: 3 }
});



/*

<Image
style={styles.image}
source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
/>

*/