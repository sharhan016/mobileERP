import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import RoundNav from '../components/RoundNav';
import Header from '../components/Header';
import colors from '../config/colors';
import TestPage from '../screens/Testpage';
import PiePage from '../screens/PiePage';
import Pie from 'react-native-pie';

class DashboardScreen extends Component {
    // static navigationOptions = {
    //     headerStyle: { 
    //       backgroundColor: '#00B2CA',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //       marginLeft: 2
    //     },
    //   };
    static navigationOptions = {
        header: null
    }
      handlePage = () => {
        this.props.navigation.navigate('TestPage');
        console.log('Dashboard Screen');
      }
    state = {  }
    render() {
        return (
            <View>
                <Header heading='Dashboard' onPress={() => this.props.navigation.openDrawer()} />
            <ScrollView >
                <StatusBar barStyle="light-content" hidden={false} backgroundColor='#3168cc' />
                
            <View style={styles.container}>
                {/* <View style={styles.topNav}>
                <RoundNav iconName='activity' heading='Analytics' iconStyle={{backgroundColor: '#c9dcfc', borderColor: '#4f91ff'}} />
                <RoundNav iconName='users' heading='Customers' iconStyle={{backgroundColor: '#fbdebc', borderColor: '#d67f18'}} />
                <RoundNav iconName='clipboard' heading='Orders' iconStyle={{backgroundColor: '#f4dff2', borderColor: '#f0aae9'}}/>
                </View>

                <View style={styles.topNav}>
                <RoundNav iconName='activity' heading='Tasks' iconStyle={{backgroundColor: '#d5e8d5', borderColor: '#aecbaa'}} />
                <RoundNav iconName='activity' heading='Sales' iconStyle={{backgroundColor: '#f9f1cd', borderColor: '#e4d594'}}  />
                <RoundNav iconName='activity' heading='Products' iconStyle={{backgroundColor: '#f0c8b4', borderColor: '#b2856d'}}  />
                </View> */}
               
                <Text style={styles.madding}>Overview:</Text>

                <View style={styles.cardContainer}>
                <Card>
                    <CardSection>
                    <View style={{width: 150, height: 40,paddingLeft: 10,alignItems: 'center',justifyContent:'space-between', flexDirection: 'row'}}>
                        <Text style={styles.textHeading}>Cash On Hand</Text>
                        <View style={{paddingHorizontal: 60}}></View>
                        <Text style={styles.textAmount}>Rs.160,000</Text>
                    </View>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                    <View style={{width: 150, height: 40,paddingLeft: 10,alignItems: 'center',justifyContent:'space-between', flexDirection: 'row'}}>
                        <Text style={styles.textHeading}>Cash On Bank</Text>
                        <View style={{paddingHorizontal: 60}}></View>
                        <Text style={styles.textAmount}>Rs.280,000</Text>
                    </View>
                    </CardSection>
                </Card>
                {/* </View>     */}

                {/* <View style={styles.cardContainer}> */}
                <Card>
                    <CardSection>
                    <View style={{width: 150, height: 40,paddingLeft: 10,alignItems: 'center',justifyContent:'space-between', flexDirection: 'row'}}>
                        <Text style={styles.textHeading}>Total Receivable</Text>
                        <View style={{paddingHorizontal: 50}}></View>
                        <Text style={styles.textAmount}>Rs.80,000</Text>
                    </View>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                    <View style={{width: 150, height: 40,paddingLeft: 10,alignItems: 'center',justifyContent:'space-between', flexDirection: 'row'}}>
                        <Text style={styles.textHeading}>Total Payable</Text>
                        <View style={{paddingHorizontal: 60}}></View>
                        <Text style={styles.textPayment}>Rs.50,000</Text>
                    </View>
                    </CardSection>
                </Card>
                </View> 
                <Text style={styles.madding}>Latest Account Transactions:</Text>
                {/* <TestPage /> */}
              
                <Button style={styles.buttonStyle} onPress={() => {this.props.navigation.navigate('Test')}} label='View Latest Transactions' textStyle={styles.buttonText} />
           
            <Text style={styles.madding}>Latest IMS Transactions:</Text>
                {/* <TestPage /> */}
               
                <Button style={styles.buttonStyle} textStyle={styles.buttonText} onPress={() => {this.props.navigation.navigate('Statistics') }} label='View IMS Transactions' />
          
            {/* <View style={styles.pieContainer}>
            <PiePage />
            <View> */}
                {/* need to add individual pie chart specs */}
            {/* </View>
            </View>
            <PiePage /> */}
            <View style={styles.pie}>
            <Pie style={styles.pie} radius={100} series={[20, 20, 20, 25, 15]}  colors={['yellow', 'green', 'orange','red','blue']} />
            </View>
                </View>
                </ScrollView>
                </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 60
        //flex: 1,
        //backgroundColor: 'lightgreen'
    },
    madding:{
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
        shadowOffset: {width: 1, height: 2},
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
    textAmount:{
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: 'green'
    },
    textPayment:{
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: 'red'
    },
    buttonStyle:{
        height: 40,
        //flex:1,
        //margin:20,
        margin: 10,
        marginRight: 20,
        flexDirection: 'row',
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        backgroundColor:colors.DODGER_BLUE
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15
    },
    moreContainer:{
        flex:1,
        //flexDirection: 'row',
        alignItems: 'center',
        color: 'blue', 
    },
    pie: {
        //flexDirection: 'row',
        //justifyContent: 'space-between'
        margin: 15
    },
    pieContainer:{
        flexDirection: 'row',
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});

export default DashboardScreen;