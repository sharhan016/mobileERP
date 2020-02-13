import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioForm from 'react-native-simple-radio-button';
import colors from '../config/colors';
import Header from '../components/Header';
import Button from '../components/Button';
import Spacer from '../components/Spacer';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import * as api from '../config/api';
import PieJS from './PieJS';
import Revenue from '../screens/ExpandablePage';
import Receipt from '../components/ExpandableComp2';
import Payment from '../components/ExpandableComp3';
import Expense from '../components/ExpandableComp4';

let radio_props = [
    { label: 'Day        ', value: 0 },
    { label: 'Week        ', value: 1 },
    { label: 'Month       ', value: 2 },
    { label: 'Custom        ', value: 3 }
];
const width = Dimensions.get('window').width;
class ReportPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        let today = moment();
        let day = today.format("DD-MM-YYYY")
        let weekDate = today.format("DD-MM-YYYY")
        let currentMonth = today.format("MMMM")
        let lweek = moment(day, "DD-MM-YYYY").subtract(7, 'days').format("DD-MM-YYYY");
        this.state = {
            currentDate: new Date(),
            customStartDate: 'Choose Starting Date',
            customEndDate: 'Choose Ending Date',
            loaded: false,
            date: day,
            weekday: weekDate,
            lastWeekdate: lweek,
            currentMonth: currentMonth,
            value: '',
            reportloading: false,
            entryLoader: true,
            isDatePickerVisible: false,
            setDatePickerVisibility: false,
            isDatePickerVisible2: false,
            setDatePickerVisibility2: false,
            isDatePickerVisible3: false,
            setDatePickerVisibility3: false,
            SalesIncome: [],
            OtherRevenue: [],
            CustomerReceipt: [],
            OtherReceipt: [],
            PurchaseExpense: [],
            OtherExpense: [],
            SupplierPayment: [],
            OtherPayment: [],
        }
    }
    componentDidMount() {
        this.getToken()
    }
    getToken = async () => {
        try {
            let token = await AsyncStorage.getItem(api.TOKEN);
            let data = await AsyncStorage.getItem(api.USER_DATA);
            var object = JSON.parse(data)
            this.setState({ tokenID: token })
            console.log('this is in state', this.state.tokenID)
            //this.getCurrentMoneyStatus()
            this.getDashboardData()
        } catch (error) {
            console.log(error)
        }
    }
  
    getDashboardData = async () => {
        const { value, date, lastWeekdate, weekday, customStartDate, customEndDate } = this.state
        let ali = 'ap_aldabbousdb' //TODO: change it 
        let body = {}
        let post = {
            "alias": ali,
            "authorization": this.state.tokenID,
        }
        //this.setState({reportloading: true})
        if (value == 0) {
            body = {
                "dateFrom": date,
                "dateTo": date
            }
            //  console.log('value is 0',body)
        } else if (value == 1) {
            body = {
                "dateFrom": lastWeekdate,
                "dateTo": weekday
            }
        }
        else if (value == 2) {
            body = {
                "dateFrom": lastWeekdate,
                "dateTo": weekday
            }
        }
        else if (value == 3) {
            body = {
                "dateFrom": customStartDate,
                "dateTo": customEndDate
            }
        }
        else {
            console.log('value is something else')
        }
        try {
            console.log(body)
            await axios.post(api.GET_DASHBOARD_DATA, body, { headers: post })
                .then(res => {
                    //console.log('Response Got',response.data.requestedData)
                    let response = res.data.requestedData
                    console.log('RESPONSE IN DATES', response)
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
                        entryLoader: false,
                        loaded: true
                    })
                })
        } catch (error) {
            console.log(error)
        }

    }
    incrementDate = () => {
        const { date } = this.state;
        let new_date = moment(date, "DD-MM-YYYY").add(1, 'days').format("DD-MM-YYYY");
        this.setState({ date: new_date })
    }
    decrementDate = () => {
        const { date } = this.state;
        let new_date = moment(date, "DD-MM-YYYY").subtract(1, 'days').format("DD-MM-YYYY");
        this.setState({ date: new_date })
    }
    lastWeek = () => {
        const { weekday, lastWeekdate } = this.state;
        let modWD = moment(weekday, "DD-MM-YYYY").subtract(7, 'days').format("DD-MM-YYYY");
        let modLWD = moment(lastWeekdate, "DD-MM-YYYY").subtract(7, 'days').format("DD-MM-YYYY");
        this.setState({ weekday: modWD, lastWeekdate: modLWD })
    }
    nextWeek = () => {
        const { weekday, lastWeekdate } = this.state;
        let modWD = moment(weekday, "DD-MM-YYYY").add(7, 'days').format("DD-MM-YYYY");
        let modLWD = moment(lastWeekdate, "DD-MM-YYYY").add(7, 'days').format("DD-MM-YYYY");
        this.setState({ weekday: modWD, lastWeekdate: modLWD })
    }
    lastMonth = () => {
        const { currentMonth } = this.state;
        let lmonth = moment(currentMonth, "MMMM").subtract(1, 'M').format("MMMM");
        this.setState({ currentMonth: lmonth })
    }
    nextMonth = () => {
        const { currentMonth } = this.state;
        let lmonth = moment(currentMonth, "MMMM").add(1, 'M').format("MMMM");
        this.setState({ currentMonth: lmonth })
    }
    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true })
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false })
    };

    handleConfirm = date => {
        let startDate = new Date(date);
        let maasam = ''
        let ddd = startDate.toISOString().slice(0, 10)
        let day = startDate.getDate().toString()
        let month = startDate.getMonth()
        if (month <= 9)
            month += 1
        maasam = '0' + month.toString()
        let year = startDate.getFullYear().toString()
        let startingDate = day + '-' + maasam + '-' + year

        this.setState({ customStartDate: startingDate })
        this.hideDatePicker();
    };
    setDatePickerVisibility = (value) => {
        this.setState({ setDatePickerVisibility: value })
    }
    showDatePicker2 = () => {
        this.setState({ isDatePickerVisible2: true })
    };

    hideDatePicker2 = () => {
        this.setState({ isDatePickerVisible2: false })
    };

    handleConfirm2 = date => {
        let startDate = new Date(date);
        let maasam = ''
        let ddd = startDate.toISOString().slice(0, 10)
        let day = startDate.getDate().toString()
        let month = startDate.getMonth()
        if (month <= 9)
            month += 1
        maasam = '0' + month.toString()
        let year = startDate.getFullYear().toString()
        let endingDate = day + '-' + maasam + '-' + year

        this.setState({ customEndDate: endingDate })
        this.hideDatePicker2();
    };
    setDatePickerVisibility2 = (value) => {
        this.setState({ setDatePickerVisibility2: value })
    }
    showDatePicker3 = () => {
        this.setState({ isDatePickerVisible3: true })
    };

    hideDatePicker3 = () => {
        this.setState({ isDatePickerVisible3: false })
    };

    handleConfirm3 = date => {
        let startDate = new Date(date);
        let maasam = ''
        let day = ''
        let d = startDate.getDate().toString()
        if (d <= 9)
            day = '0' + d
        else
            day = d
        let month = startDate.getMonth()
        if (month <= 9)
            month += 1
        maasam = '0' + month.toString()
        let year = startDate.getFullYear().toString()
        let endingDate = day + '-' + maasam + '-' + year

        this.setState({ date: endingDate })
        this.hideDatePicker3();
    };
    setDatePickerVisibility3 = (value) => {
        this.setState({ setDatePickerVisibility3: value })
    }
    getReportBtn = () => {
        console.log('Button is clicked')
        this.setState({
            reportloading: true,
            loaded: false,
            SalesIncome: [],
            OtherRevenue: [],
            CustomerReceipt: [],
            OtherReceipt: [],
            PurchaseExpense: [],
            OtherExpense: [],
            SupplierPayment: [],
            OtherPayment: []
        })
        this.getDashboardData()
    }


    render() {
        //console.log('In DateSection Render', this.state)
        const { value, date, lastWeekdate, weekday, currentMonth, customStartDate, customEndDate } = this.state;
        const DatePicker = <View style={styles.dateContainer}>
            <TouchableOpacity onPress={this.decrementDate}><Ionicons name="md-arrow-dropleft" size={25} color={'black'} /></TouchableOpacity>
            <TouchableOpacity onPress={this.showDatePicker3} ><Text style={styles.dateText}> {date} </Text></TouchableOpacity>
            <TouchableOpacity onPress={this.incrementDate}><Ionicons name="md-arrow-dropright" size={25} color={'black'} /></TouchableOpacity>
        </View>
        const WeekPicker = <View style={styles.dateContainer}>
            <TouchableOpacity onPress={this.lastWeek}><Ionicons name="md-arrow-dropleft-circle" size={25} color={'black'} /></TouchableOpacity>
            <Text style={styles.dateText}>  {lastWeekdate}  - {weekday}</Text>
            <TouchableOpacity onPress={this.nextWeek}><Ionicons name="md-arrow-dropright-circle" size={25} color={'black'} /></TouchableOpacity>
        </View>
        const MonthPicker = <View style={styles.dateContainer}>
            <TouchableOpacity onPress={this.lastMonth}><Ionicons name="md-arrow-dropleft" size={28} color={'black'} /></TouchableOpacity>
            <Text style={styles.dateText}>  {currentMonth}</Text>
            <TouchableOpacity onPress={this.nextMonth}><Ionicons name="md-arrow-dropright" size={28} color={'black'} /></TouchableOpacity>
        </View>
        const CustomPicker = <View style={styles.customContainer}>
            <Text style={{ fontSize: 14, color: 'gray' }} >From:</Text>
            <View style={{ paddingHorizontal: 5 }}></View>
            <TouchableOpacity onPress={this.showDatePicker}><Text style={{ fontSize: 15 }} >{customStartDate}</Text></TouchableOpacity>
            <View style={{ paddingHorizontal: 15 }}></View>
            <Text style={{ fontSize: 14, color: 'gray' }} >To:</Text>
            <View style={{ paddingHorizontal: 5 }}></View>
            <TouchableOpacity onPress={this.showDatePicker2}><Text style={{ fontSize: 15 }}>{customEndDate}</Text></TouchableOpacity>
        </View>
        const ReportButton = <Button label='Get Report' onPress={this.getReportBtn} style={styles.buttonStyle} />
        const progress = <ActivityIndicator
            animating={this.state.reportloading}
            style={{ marginTop: 10 }}
            color={colors.HEADER_BLUE} size="large" />
        const initialLoader = <ActivityIndicator
            animating={this.state.entryLoader}
            style={{ marginTop: 10 }}
            color={colors.HEADER_BLUE} size="large" />
        let Report = <View>
            <Revenue title='Revenues' SI={this.state.SalesIncome} OR={this.state.OtherRevenue} />
            <Receipt title='Receipts' CR={this.state.CustomerReceipt} OR={this.state.OtherReceipt} />
            <Payment title='Payments' SP={this.state.SupplierPayment} OP={this.state.OtherPayment} />
            <Expense title='Expenses' PE={this.state.PurchaseExpense} OE={this.state.OtherExpense} />
            <PieJS text='Sales' execute={1} dashData={this.state.SalesCategory} />
            <PieJS text='Stock' execute={2} dashData={this.state.StockCategory} />
        </View>
        return (
            <View style={styles.container} >
                <Header heading='Analytics' onPress={() => this.props.navigation.openDrawer()} />
                <View style={styles.radioField}>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        buttonSize={8}
                        //labelColor={colors.INPUT_LABEL}
                        buttonOuterSize={18}
                        selectedLabelColor={colors.LoginButton}
                        formHorizontal={true}
                        animation={false}
                        buttonColor={colors.LoginBG}
                        selectedButtonColor={colors.LoginButton}
                        onPress={(value) => {
                            if (value) {
                                this.setState({ value: value })
                            } else {
                                this.setState({ value: 0 })
                            }
                        }}
                    />
                </View>
                {value == 0 ? DatePicker : value == 1 ? WeekPicker : value == 2 ? MonthPicker : CustomPicker}
                {ReportButton}
                {/* <Spacer space={5} /> */}
                <ScrollView>
                    {this.state.loaded ? Report : progress}
                    <Spacer space={20} />
                </ScrollView>
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker} />
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible2}
                    mode="date"
                    onConfirm={this.handleConfirm2}
                    onCancel={this.hideDatePicker2} />
                <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible3}
                    mode="date"
                    onConfirm={this.handleConfirm3}
                    onCancel={this.hideDatePicker3} />
            </View>
        );
    }
}
export default ReportPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.WHITISH,
    },
    dateContainer: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        width: width - 20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    radioField: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 40,
        justifyContent: 'space-between',
        width: width + 30,
        marginTop: 20,
        marginRight: 15
    },
    dateText: { fontSize: 20 },
    customContainer: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonStyle: {
        width: '30%',
        marginTop: 20,
        //marginLeft: 20
    }
});