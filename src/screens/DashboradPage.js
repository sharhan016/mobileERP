import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import RoundNav from '../components/RoundNav';
import Info from '../components/Info';
import Report from '../components/Report';
import Header from '../components/Header';
import colors from '../config/colors';
import PieJS from './PieJS';
import Line from '../components/Line';
import LineCT from '../components/LineChart';
import Spacer from '../components/Spacer';


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

                    <Line />
                    <View style={{ height: 130, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Info line1='Cash' line2='Inhand' amount='$32,375' />
                        <Info line1='Cash' line2='Inhand' amount='$32,375' />
                        <Info line1='Cash' line2='Inhand' amount='$32,375' />
                        <Info line1='Cash' line2='Inhand' amount='$32,375' />
                    </View>
                    <Line />

                    <View style={styles.reportView}>
                        <Report />
                        <Card><PieJS /></Card>
                        <View style={{ height: 10 }}></View>
                        <LineCT />

                    </View>

                </ScrollView>
            </View>
        );
    }
}
export default DashboardPage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITISH,
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
    reportView: {
        marginRight: 2,
        marginLeft: 2,
        //margin: 10,
        //padding: 5
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