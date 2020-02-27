import React, { Component } from "react";
import { View,Text,StyleSheet,FlatList,TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import Header from '../components/Header';
import colors from '../config/colors';
import axios from "axios";
import * as api from '../config/api';
import { ListItem } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';



class CustomerPage extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        const data = [
            {
                id: '1',
                name: 'Hello'
            },
            {
                id: '2',
                name: 'Hai'
            }
        ]
        return (
            <View style={styles.container}>
            <Header heading='Customers' back={true} onPress={() => this.props.navigation.goBack()} />
            <FlatList
            data={data}
            renderItem={() => {
                return(
                    <TouchableWithoutFeedback onPress={() => null}>
                        <View>
                        <ListItem
                            containerStyle={styles.listStyle}
                            //titleStyle={{color: 'white'}}
                            //subtitleStyle={{color: 'white'}}
                            bottomDivider
                            roundAvatar
                            title={'Customer '}
                            subtitle={'General'}
                            leftAvatar={<UserAvatar size="50" name={'GN'} color="#000" />}
                            //chevron
                        />
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}
            />
            </View>
        );
    }
}
export default CustomerPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITISH
    },
    listStyle: {
        borderRadius: 7,
        backgroundColor: '#FFFFFF2b',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: { height: 0, width: 0 },
    },
    shadow: {
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: 'black',
        shadowOpacity: 2.0,
        elevation: 2
    }
});