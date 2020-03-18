import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Header from '../components/Header';
import colors from '../config/colors';
import axios from "axios";
import * as api from '../config/api';
import { ListItem, SearchBar, List } from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import Feather from 'react-native-vector-icons/Feather';
import jsonData from './data.json'



class CustomerPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            searchText: null
        }
        this.arrayholder = jsonData.requestedData.SuppCustTransactionSummary;
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        this.setState({
            data: jsonData.requestedData.SuppCustTransactionSummary
        })
    } 
    currencyFormat =(num) => {
        return '₹ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    handleClick = (item) =>{
        this.props.navigation.navigate('CustomerDetail', data={item})
        console.log('I am clicked',item);
      }
    renderName = (event) => {
        let initial = event.item.FullName.toUpperCase()
        let acronym = initial.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
        let mod = acronym.slice(0, 2)
        let amount = parseInt(event.item.PayableAmount)
        let payableAmount = this.currencyFormat(amount)
        return (
            <TouchableWithoutFeedback onPress={ () => {
                this.handleClick(event.item)
            }}>
                <View>
                    <ListItem
                        containerStyle={styles.listStyle}
                        //titleStyle={{color: 'white'}}
                        //subtitleStyle={{color: 'white'}}
                        bottomDivider
                        roundAvatar
                        title={event.item.FullName}
                        subtitle={payableAmount}
                        leftAvatar={<UserAvatar size="50" name={mod} color="#000" />}
                    //chevron
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }
    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Search Here..."
                round
                value={this.state.searchText}
                onChangeText={text => this.searchFilterFunction(text)}
                searchIcon={<Feather name={'search'} size={18} color={'black'} />}
                cancelIcon={<Feather name={'wifi'} size={18} color={'black'} />}
                containerStyle={{ backgroundColor: colors.BGStatus }}
                inputContainerStyle={{ backgroundColor: colors.WHITISH }}
                autoCorrect={false}
            />
        );
    };
    searchFilterFunction = text => {
        const newData = this.arrayholder.filter(item => {
            // const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
            const itemData = `${item.FullName.toUpperCase()}`
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({ data: newData });
    };
    render() {
        return (
            <View style={styles.container}>
                {/* <Header heading='Customers' back={true} onPress={() => this.props.navigation.goBack()} /> */}
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderName}
                    ListHeaderComponent={this.renderHeader}
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
        borderBottomWidth: 0
    },
    shadow: {
        shadowOffset: { width: 1, height: 1, },
        shadowColor: 'black',
        shadowOpacity: 2.0,
        elevation: 2
    }
});