import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import RoundNav from '../components/RoundNav';
import Report from '../components/Report';
import Header from '../components/Header';
import colors from '../config/colors';
import Pie from '../screens2/pie2';



class DashboardPage extends Component {

    static navigationOptions = {
        header: null
    }
    openReport = () => {
        console.log('Ene thottu')
        this.props.navigation.navigate('Report')
    }

    render() {
        return (

            <View style={styles.container}>
                <Header heading='Dashboard' onPress={() => this.props.navigation.openDrawer()} />

                <ScrollView >
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.BGStatus} />
                    <View style={styles.container}>
                        <View style={styles.topNav}>
                            <RoundNav onPress={this.openReport} iconName='activity' heading='Analytics' iconStyle={{ backgroundColor: '#c9dcfc', borderColor: '#4f91ff' }} />
                            <RoundNav iconName='users' heading='Customers' iconStyle={{ backgroundColor: '#fbdebc', borderColor: '#d67f18' }} />
                            <RoundNav iconName='clipboard' heading='Orders' iconStyle={{ backgroundColor: '#f4dff2', borderColor: '#f0aae9' }} />
                        </View>

                        <View style={styles.topNav}>
                            <RoundNav iconName='activity' heading='Tasks' iconStyle={{ backgroundColor: '#d5e8d5', borderColor: '#aecbaa' }} />
                            <RoundNav iconName='activity' heading='Sales' iconStyle={{ backgroundColor: '#f9f1cd', borderColor: '#e4d594' }} />
                            <RoundNav iconName='activity' heading='Products' iconStyle={{ backgroundColor: '#f0c8b4', borderColor: '#b2856d' }} />
                        </View>
                    </View>
                    <View style={{ marginLeft: 5, marginRight: 5, borderWidth: StyleSheet.hairlineWidth, height: 1, borderColor: 'gray' }}></View>

                    <View style={{ height: 130, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={styles.singleItem}>
                            <Text style={styles.headingText}>{'\t'}Cash {'\n'} Inhand</Text>
                            <Text style={styles.valueText}> $32,375</Text>
                        </View>

                        <View style={styles.singleItem}>
                            <Text style={styles.headingText}>{'\t'}Bank {'\n'} Balance</Text>
                            <Text style={styles.valueText}> $20,595</Text>
                        </View>

                        <View style={styles.singleItem}>
                            <Text style={styles.headingText}>{'\t'}Not {'\n'}Settled</Text>
                            <Text style={styles.valueText}> 12,321</Text>
                        </View>

                        <View style={styles.singleItem}>
                            <Text style={styles.headingText}>{'\t'}Total {'\n'} Payable</Text>
                            <Text style={styles.valueText}> 12,321</Text>
                        </View>

                    </View>

                    <View style={{ marginLeft: 5, marginRight: 5, borderWidth: StyleSheet.hairlineWidth, height: 1, borderColor: 'gray' }}></View>
                    <View style={styles.reportView}>
                        <Report />
                        <View style={{height: 10}}></View>
                        {/* <Pie data='This is the data passed' /> */} 


                    </View>

                </ScrollView>
            </View>
        );
    }
}
export default DashboardPage;

const styles = StyleSheet.create({
    container: {
        //backgroundColor: colors.WHITISH,
        flex: 1
    },
    madding: {
        padding: 5,
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "500",
        //textDecorationLine: 'underline'
    },
    cardContainer: {
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        elevation: 1,
        shadowOpacity: 0.4,
        shadowRadius: 10,
        padding: 2,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
        borderRadius: 8
    },
    textHeading: {
        textAlign: 'center',
        fontSize: 20
    },
    textAmount: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: 'green'
    },
    textPayment: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: 'red'
    },
    buttonStyle: {
        height: 40,
        //flex:1,
        //margin:20,
        margin: 10,
        marginRight: 20,
        flexDirection: 'row',
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        backgroundColor: colors.DODGER_BLUE
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15
    },
    moreContainer: {
        flex: 1,
        //flexDirection: 'row',
        alignItems: 'center',
        color: 'blue',
    },
    pie: {
        //flexDirection: 'row',
        //justifyContent: 'space-between'
        margin: 15
    },
    pieContainer: {
        flexDirection: 'row',
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    singleItem: {
        padding: 10,
        justifyContent: 'space-evenly'
    },
    headingText: {
        fontSize: 18,
        color: 'gray'
    },
    valueText: {
        fontSize: 17,
        color: '#3168cc',
        fontWeight: '700'
    },
    reportView: {
        margin: 10,
        padding: 5
    },
    headerContainer: {
        backgroundColor: '#092d5f',
        width: "100%",
        flexDirection: 'row',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 2,
        //position: 'absolute',
        //top: 0
    },
    leftIcon: {
        justifyContent: 'flex-start'
    },
    textStyle: {
        fontSize: 20,
        paddingBottom: 20,
        color: 'white',
        fontWeight: '600'
    },
    headerText: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        height: 60,
        paddingRight: 20

    }
});