import React from 'react';
import { View } from 'react-native';
import colors from '../config/colors';

const Card = (props) => {
    return(
        <View style= {styles.containerStyle}>
        {props.children}
        </View>
    );
}

const styles = {
    containerStyle : {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.EXPAND_INNER,
        borderBottomWidth: 0,
        shadowColor: colors.EXPAND_INNER,
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1.5,
        marginLeft: 5,
        marginRight: 5,
        //marginTop: 15,
        backgroundColor: colors.WHITISH
    }
}

export default Card;