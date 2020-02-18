import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import * as api from '../config/api';
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
import Expandable from '../screens/ExpandablePage';
import Expand2 from '../components/ExpandableComp2';
import Expand3 from '../components/ExpandableComp3';
import Expand4 from '../components/ExpandableComp4';
import Test from './TestPage';
import CB from '../components/CashBlock';
import BB from '../components/BankBlock';

const screenWidth = Dimensions.get('screen').width;

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenID: '',
            CashOnBank: '',
            CashOnHand: '',
            CashPayable: '',
            CashReceivable: '',
            SalesIncome: [],
            // OtherRevenue: [],
            loaded: false,
            loaded2: false,
            initial: false
        }
    }
    componentDidMount() {
        this.getToken()
    }
    static navigationOptions = {
        header: null
    }
    openReport = () => {
        this.props.navigation.navigate('Report')
    }
    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            let data = await AsyncStorage.getItem(api.USER_DATA);
            this.setState({ tokenID: token })
            //console.log('this is in state', this.state.tokenID)
            this.getCurrentMoneyStatus()
            this.getDashboardData()
        } catch (error) {
            console.log(error)
        }
    }

    getCurrentMoneyStatus = async () => {

        let alias = 'ap_lagnuvodb' //TODO: change it later
        let post = {
            "alias": alias,
            //"authorization": this.state.tokenID,
            "authorization": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJJRCI6IjIiLCJ1c2VybmFtZSI6Im9ubGluZUBsYWdudXZvLmNvbSIsIkNvbXBhbnlfSUQiOiIyIiwiRmlueWVhcl9JRCI6IjIiLCJMb2dnZWRPbiI6IjIwMjAtMDEtMjggMTE6Mzc6NTYuMDAwMDAwIiwiUmFuZG9tIjo2Mn0.sLbfqfWklEE3aambvVnR3r5xOxNi9kEKJQWETOsDsVg',
        }

        try {
            await axios.post(api.GET_CASH_VALUES, {}, { headers: post })
                .then(response => {
                    let res = response.data.requestedData
                    let cashOnBank = res.bankAccountBlock.CashOnBank_tillnow
                    let cashOnHand = res.cashAccountBlock.CashOnHand_tillnow
                    let cashPayable = res.payableBlock.PayableAmount
                    let cashReceivable = res.receivableBlock.ReceivableAmount
                    this.setState({
                        CashOnBank: cashOnBank,
                        CashOnHand: cashOnHand,
                        CashPayable: cashPayable,
                        CashReceivable: cashReceivable,
                        loaded: true
                    })
                })

                .catch(error => console.log(error))
        } catch (error) {
            console.log('inside catch block', error)
        }

    }
    getDashboardData = async () => {
        let ali = 'ap_aldabbousdb' //TODO: change it 
        let post = {
            "alias": ali,
            "authorization": this.state.tokenID,
        }
        try {
            await axios.post(api.GET_DASHBOARD_DATA, {}, { headers: post })
                .then(res => {
                        let response = res.data.requestedData
                        let salesIncome = response.salesIncomes
                        let otherRevenue = response.otherIncomes
                        let customerReceipt = response.customerReciepts
                        let otherReceipt = response.otherReciepts
                        let purchaseExpense = response.purchaseExpenses
                        let otherExpense = response.otherExpenses
                        let supplierPayment = response.supplierPayments
                        let otherPayment = response.otherPayments
                        let salesCategoryWise = response.sales_CategoryWise
                        let stockCategoryWise = response.stock_CategoryWise

                        this.setState({
                            SalesIncome: salesIncome,
                            OtherRevenue: otherRevenue,
                            CustomerReceipt: customerReceipt,
                            OtherReceipt: otherReceipt,
                            PurchaseExpense: purchaseExpense,
                            OtherExpense: otherExpense,
                            SupplierPayment: supplierPayment,
                            OtherPayment: otherPayment,
                            SalesCategory: salesCategoryWise,
                            StockCategory: stockCategoryWise,
                            loaded2: true,
                            initial: false
                        })
                })

        } catch (error) {
            console.log(error)
        }


    }

    render() {
        //console.log('In Dashboard Render',this.state)
        const { loaded, loaded2 } = this.state
        const initialLoader = <ActivityIndicator
            animating={this.state.initial}
            color={colors.HEADER_BLUE} size="small" />
        const Report = <View>
            <Expandable title='Revenues' SI={this.state.SalesIncome} OR={this.state.OtherRevenue} />
            <Expand2 title='Receipts' CR={this.state.CustomerReceipt} OR={this.state.OtherReceipt} />
            <Expand3 title='Payments' SP={this.state.SupplierPayment} OP={this.state.OtherPayment} />
            <Expand4 title='Expenses' PE={this.state.PurchaseExpense} OE={this.state.OtherExpense} />
            <View style={{ height: 20 }}></View>
            <Card ><PieJS text='Sales' execute={1} dashData={this.state.SalesCategory} /></Card>
            <View style={{ height: 20 }}></View>
            <Card ><PieJS text='Stock' execute={2} dashData={this.state.StockCategory} /></Card>
        </View>
        const cashBlock = <View>
            <View style={{ flexDirection: 'row' }}>
                <Info line2='Receivable' amount={this.state.CashReceivable} />
                <Info line2='Payable' amount={this.state.CashPayable} />
            </View>
            <View style={{ flexDirection: 'row' }}>
            <CB data={this.state.CashOnHand}/>
            <BB data={this.state.CashOnBank} />
            </View>
        </View>
        return (
            <View
                style={styles.container}
                // onStartShouldSetResponderCapture={() => {
                //     this.setState({ enableScrollViewScroll: true });
                // }}
            >
                <Header heading='Dashboard' onPress={() => this.props.navigation.openDrawer()} />

                <ScrollView
                   // scrollEnabled={this.state.enableScrollViewScroll}
                >
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.BGStatus} />
                    <View style={styles.container}>
                        <View style={styles.topNav}>
                            <RoundNav onPress={this.openReport} iconName='activity' heading='Analytics' iconStyle={{ backgroundColor: '#c9dcfc', borderColor: '#4f91ff' }} />
                            <RoundNav iconName='users' heading='Customers' iconStyle={{ backgroundColor: '#fbdebc', borderColor: '#d67f18' }} />
                            <RoundNav iconName='clipboard' heading='Orders' iconStyle={{ backgroundColor: '#f4dff2', borderColor: '#f0aae9' }} />
                        </View>

                        {loaded ? cashBlock : null}
                        {/* <View style={styles.topNav}>
                            <RoundNav iconName='activity' heading='Tasks' iconStyle={{ backgroundColor: '#d5e8d5', borderColor: '#aecbaa' }} />
                            <RoundNav iconName='activity' heading='Sales' iconStyle={{ backgroundColor: '#f9f1cd', borderColor: '#e4d594' }} />
                            <RoundNav iconName='activity' heading='Products' iconStyle={{ backgroundColor: '#f0c8b4', borderColor: '#b2856d' }} />
                        </View> */}
                        {initialLoader}
                        <View style={{ height: 40 }}></View>
                        {/* <View style={{ height: 200, flexDirection: 'column', justifyContent: 'space-around' }}>
                        <View style={{ height: 5 }}></View>
                        <Info line1='Cash' line2='Inhand' amount='$32,375' />
                        <Info line1='Cash' line2='Inhand' amount='$32,375' />
                        <Info line1='Cash' line2='Inhand' amount='$32,375' />
                        <Info line1='Cash' line2='Inhand' amount='$32,375' />
                    </View> 
                    */}
                        {loaded2 ? Report : null}


                        {/* {loaded2 ? <Expandable title='Revenues' SI={this.state.SalesIncome} OR={this.state.OtherRevenue} /> : null }
                    {loaded2 ? <Expand2 title='Receipts' CR={this.state.CustomerReceipt} OR={this.state.OtherReceipt}  /> : null }
                    {loaded2 ? <Expand3 title='Payments' SP={this.state.SupplierPayment} OP={this.state.OtherPayment} /> : null }
                    {loaded2 ? <Expand4 title='Expenses' PE={this.state.PurchaseExpense} OE={this.state.OtherExpense}  /> : null } 
                    <View style={{ height: 20 }}></View>
                    {loaded2 ? <Card ><PieJS text='Sales' execute={1} dashData={this.state.SalesCategory} /></Card> : null}
                    <View style={{ height: 20 }}></View>
                    {loaded2 ? <Card ><PieJS text='Stock' execute={2} dashData={this.state.StockCategory} /></Card> : null}
                    <View style={{ height: 20 }}></View>
                     {loaded2 ? <LineCT /> : null}
                     <View style={{ height: 10 }}></View>
                     {loaded2 ? <LineCT bez={true} /> : null } */}

                        <View style={{ height: 40 }}></View>

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
        flex: 1,
        width: screenWidth
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