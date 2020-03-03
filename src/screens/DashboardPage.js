import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, ActivityIndicator,RefreshControl,ToastAndroid, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import * as api from '../config/api';
import moment from 'moment';
import Card from '../components/Card';
import RoundNav from '../components/RoundNav';
import Info from '../components/Info';
import Header from '../components/Header';
import colors from '../config/colors';
import PieJS from './PieJS';
import LineCT from '../components/LineChart';
import Expandable from '../screens/ExpandablePage';
import Expand2 from '../components/ExpandableComp2';
import Expand3 from '../components/ExpandableComp3';
import Expand4 from '../components/ExpandableComp4';
import CB from '../components/CashBlock';
import BB from '../components/BankBlock';

const screenWidth = Dimensions.get('screen').width;


  //const 

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        let today = moment();
        let day = today.format("DD-MM-YYYY")
        let toDate = moment(day, "DD-MM-YYYY").subtract(12, 'days').format("DD-MM-YYYY");
        let lweek = moment(day, "DD-MM-YYYY").subtract(5, 'days').format("DD-MM-YYYY");
        this.state = {
            tokenID: '',
            CashOnBank: '',
            CashOnHand: '',
            CashPayable: 0,
            CashReceivable: 0,
            SalesIncome: [],
            todayDate: day,
            DateTo: toDate,
            beforeDate: lweek,
            // OtherRevenue: [],
            loaded: false,
            loaded2: false,
            loaded3: false,
            initial: true,
            refreshing: false
        }
      //  const [refreshing, setRefreshing] = React.useState(false);
    }
  
    onRefresh = () => {
        this.setState({refreshing: true})
        this.getData()
    }
    getData = () => {
        this.getDashboardData()
        this.getCurrentMoneyStatus()
        this.getLineData()
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
    openCustomer = () => {
        this.props.navigation.navigate('Customer')
    }
    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            let alias = await AsyncStorage.getItem(api.ALIAS_NAME);
            this.setState({ tokenID: token, aliasName: alias })
            console.log('token',token)
            this.getCurrentMoneyStatus()
            this.getDashboardData()
            this.getLineData()
        } catch (error) {
            console.log(error)
        }
    }

    getCurrentMoneyStatus = async () => {

        let alias = this.state.aliasName
        let post = {
            "alias": alias,
            "authorization": this.state.tokenID,
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
        console.log('Reached dashboard data')
        let ali = this.state.aliasName
        let post = {
            "alias": ali,
            "authorization": this.state.tokenID,
        }
        try {
            await axios.post(api.GET_DASHBOARD_DATA, {}, { headers: post })
                .then(res => {
                    let response = res.data.requestedData
                    console.log(response.salesIncomes)
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
                        initial: false,
                        refreshing: false
                    })
                })

        } catch (error) {
            console.log(error)
        }
    }
    getLineData = async () => {
        let alias = this.state.aliasName
        const { todayDate, DateTo } = this.state
        let body = {
            "dateFrom": DateTo,
            "dateTo": todayDate
        }
        let post = {
            "alias": alias,
            "authorization": this.state.tokenID,
        }
        try {
            await axios.post(api.GET_LINE_DATA, body, { headers: post })
                .then(res => {
                    let response = res.data.requestedData
                    this.setState({
                        LineData: response,
                        loaded3: true
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { loaded, loaded2, loaded3, initial, LineData, SalesIncome, OtherRevenue, CustomerReceipt, OtherReceipt, SupplierPayment, OtherPayment, PurchaseExpense, OtherExpense, SalesCategory, StockCategory, CashReceivable, CashPayable, CashOnBank, CashOnHand } = this.state
        const { loaderStyle, container, topNav, textStyle } = styles
        let receivableAmount = CashReceivable.toFixed(2)
        let payableAmount = CashPayable.toFixed(2)
        const initialLoader = <ActivityIndicator
            animating={initial}
            style={loaderStyle}
            color={colors.HEADER_BLUE} size="small" />
        const Report = <View>
            <Expandable title='Revenues' SI={SalesIncome} OR={OtherRevenue} />
            <Expand2 title='Receipts' CR={CustomerReceipt} OR={OtherReceipt} />
            <Expand3 title='Payments' SP={SupplierPayment} OP={OtherPayment} />
            <Expand4 title='Expenses' PE={PurchaseExpense} OE={OtherExpense} />
            <View style={{ height: 20 }}></View>
            <Card ><PieJS text='Sales' execute={1} dashData={SalesCategory} /></Card>
            <View style={{ height: 20 }}></View>
            <Card ><PieJS text='Stock' execute={2} dashData={StockCategory} /></Card>
        </View>
        const cashBlock = <View>
            <View style={{ flexDirection: 'row' }}>
                <Info line2='Receivable' amount={receivableAmount} />
                <Info line2='Payable' amount={payableAmount} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <CB data={CashOnHand} />
                <BB data={CashOnBank} />
            </View>
        </View>
        return (
            <View style={container} >
                <Header heading='Dashboard' onPress={() => this.props.navigation.openDrawer()} />

                <ScrollView 
                refreshControl={
                    <RefreshControl progressBackgroundColor={colors.WHITISH} tintColor={colors.BGStatus} refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                  } >
                    <StatusBar barStyle="light-content" hidden={false} backgroundColor={colors.BGStatus} />
                    <View style={container}>
                        <View style={topNav}>
                            <RoundNav onPress={this.openReport} iconName='activity' heading='Reports' iconStyle={{ backgroundColor: '#c9dcfc', borderColor: '#4f91ff' }} />
                            <RoundNav onPress={() => ToastAndroid.show('Work in progress', ToastAndroid.SHORT)} iconName='users' heading='Customers' iconStyle={{ backgroundColor: '#fbdebc', borderColor: '#d67f18' }} />
                            <RoundNav onPress={() => ToastAndroid.show('Work in progress', ToastAndroid.SHORT)} iconName='clipboard' heading='Suppliers' iconStyle={{ backgroundColor: '#f4dff2', borderColor: '#f0aae9' }} />
                        </View>
                        {/* <View style={topNav}>
                            <RoundNav iconName='activity' heading='Tasks' iconStyle={{ backgroundColor: '#d5e8d5', borderColor: '#aecbaa' }} />
                            <RoundNav iconName='activity' heading='Sales' iconStyle={{ backgroundColor: '#f9f1cd', borderColor: '#e4d594' }} />
                            <RoundNav iconName='activity' heading='Products' iconStyle={{ backgroundColor: '#f0c8b4', borderColor: '#b2856d' }} />
                        </View> */}
                        {loaded ? cashBlock : null}

                        <View style={{ height: 20 }}></View>
                        {initial ? initialLoader : null}
                        <View style={{ height: 40 }}></View>

                        {loaded2 ? Report : null}

                        <View style={{ height: 20 }}></View>
                        
                        {loaded3 ? <Card>
                            <Text style={textStyle}>Sales and Purchase</Text>
                            {/* <View style={styles.textSection}><Text style={{fontSize: 12}}>Last 12 Days</Text></View> */}
                            <View style={{alignItems: 'center', paddingBottom: 10,}}>
                            <View style={{flexDirection: 'row',justifyContent: 'flex-start'}}>
                            {/* <View style={{width: 40}}></View> */}
                            <View style={[styles.round, {backgroundColor: '#103d85'}]}></View>
                            <Text style={{marginLeft: 5}}>Sales</Text>
                            <View style={{width: 40}}></View>
                            <View style={[styles.round, {backgroundColor: '#e00b0b'}]}></View>
                            <Text style={{marginLeft: 5}}>Purchases</Text>
                            </View>
                            </View>
                            <LineCT lineData={LineData} bez={true} />
                        </Card> : null}

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
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    loaderStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 22,
        width: screenWidth - 10,
        paddingVertical: 10
    },
    round: {
        height: 15,
        width: 15,
        borderRadius: 50,
        marginLeft: 10
    },
    textSection:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    }
});