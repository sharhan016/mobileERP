import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import colors from '../config/colors';

const Indicator = (props) => (
    <ActivityIndicator 
    animating = {props.loading} 
    color = {colors.HEADER_BLUE}
    size = "large"/>
    )
export default Indicator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


