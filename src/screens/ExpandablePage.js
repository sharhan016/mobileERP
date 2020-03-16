import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, FlatList, TouchableOpacity, Touchable, Dimensions, ScrollView } from "react-native";
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import json from '../screens/data2.json'
import BoxInfo from '../components/BoxInfo';
import colors from "../config/colors";
import { Divider } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';


const WIDTH = Dimensions.get('screen').width;


class ExpandablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            revenue: [],
            amount: 0,
            otherAmount: 0
            //Sales: []
        }
        this.componentHeight = new Animated.Value(100)
        this.SI = this.props.SI
        this.OR = this.props.OR
    }
    componentDidMount() {

        this.getSalesData()
        this.getOtherRevenueAmount()
    }
    currencyFormat =(num) => {
        return '₹ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    getSalesData = () => {
        let jsonData = this.SI
        let amount = 0
        const Sales = jsonData.map((d) => {
            const { TransFullName, PayableAmount, ...rest } = d
            let sales = [TransFullName, PayableAmount]
            return sales
        })
        const salesRevenue = Sales.map((e) => {
            amount = amount + parseInt(e[1])
            return amount
        })
        let length = salesRevenue.length - 1
        let salesAmount = salesRevenue[length]
        if (salesAmount == undefined || salesAmount == null) {
            salesAmount = 0
            this.setState({ Exist: false, revenue: Sales, amount: salesAmount })
        } else {
           let amo = this.currencyFormat(salesAmount)
          // console.log('Salesamount',salesAmount)
            this.setState({ Exist: true, revenue: Sales, amount: amo, length: length + 1 });
        }
    }
    getOtherRevenueAmount = () => {
        let jsonData = this.OR
        let arr = []
        
        let revenueAmount = jsonData.map((o) => {
            let amount = parseInt(o.OB) - parseInt(o.CreditSum) + parseInt(o.DebitSum)
            return arr.push(amount)
        })
        const reducer = (acc, currentValue) => acc + currentValue;
        let revenueAmo = arr.reduce(reducer);
        let revenue = this.currencyFormat(revenueAmo)
        this.setState({ otherAmount: revenue });

    }

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
        if (this.state.Exist) {
            !this.state.collapsed ? this.onCollapse() : this.onExpand()
        }
        else {
            this.setState({ collapsed: true })
        }

    }
    onExpand = () => {
        Animated.timing(this.componentHeight, {
            duration: 800,
            toValue: this.state.length == 1 ? 140 : 250,
        }).start();
    }
    onCollapse = () => {
        Animated.timing(this.componentHeight, {
            duration: 500,
            toValue: 100
        }).start();
    }
    static navigationOptions = {
        header: null
    }

    render() {
        const downArrow = <Feather name={this.state.collapsed ? 'chevron-down' : 'chevron-up'} size={15} style={{ padding: 0 }} />
        const { amount, otherAmount, value } = this.state

        return (
            <Animated.View style={[styles.component]} >

                <TouchableOpacity activeOpacity={.9} onPress={this.toggleExpanded}>

                    <View style={{ marginBottom: 10 }}>
                        <Card style={{ borderColor: colors.EXPAND_INNER, shadowColor: colors.EXPAND_INNER }}>
                            <CardSection style={{ padding: 0 }}>
                                <View style={styles.cardHeading}><Text style={styles.title}>{this.props.title}</Text></View>
                            </CardSection>
                        </Card>
                        <Card style={{ borderColor: colors.EXPAND_INNER, shadowColor: colors.EXPAND_INNER }}>
                            <Animated.View style={[styles.inCard, { height: this.componentHeight }]}>
                                <View style={{ height: 2 }}></View>
                                <View style={styles.horizontalView}>
                                    <Text style={styles.textStyle}>Sales Revenue</Text>
                                    <Text style={styles.textStyle}>{amount}</Text>
                                </View>
                                <View style={{ height: 2 }}></View>
                                <View style={styles.horizontalView}>
                                    <Text style={styles.textStyle}>Other Revenue</Text>
                                    <Text style={styles.textStyle}>{otherAmount}</Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                {this.state.Exist ? downArrow : null}
                                </View>
                                <View style={{ height: 5 }}></View>

                                {/* ############ EXPANDABLE SECTION ################### */}


                                <FlatList
                                    nestedScrollEnabled={true}
                                    data={this.state.revenue}
                                    keyExtractor={(i, index) => {
                                        return index.toString()
                                    }}
                                    renderItem={(data) => {
                                        let amount = parseInt(data.item[1])
                                        let cash =  this.currencyFormat(amount)
                                        return (<View>
                                            <View style={styles.horizontalView}>
                                                <Text style={styles.textStyle}>{data.item[0]}</Text>
                                                <Text style={styles.textStyle}>{cash}</Text>
                                            </View>
                                            {/* <View style={{ height: 1.5 }}></View> */}
                                            <Divider style={{ backgroundColor: 'gray', marginLeft: 20, marginRight: 20 }} />
                                        </View>
                                        )
                                    }}
                                />
                            </Animated.View>
                        </Card>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default ExpandablePage;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        //alignItems: 'center',
    },
    component: {
        //backgroundColor: 'gray',
        alignItems: 'center',
        //justifyContent: 'center',
        //flex: 1

    },
    inCard: {
        backgroundColor: colors.EXPAND_INNER,             // color
        paddingLeft: 10,
        height: 80,
        borderRadius: 6
    },
    textStyle: {
        fontSize: 15,
        paddingVertical: 5,
    },
    headingTextStyle: {
        fontSize: 18
    },
    horizontalView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 15,
        paddingVertical: 5,
        justifyContent: 'space-between'
    },
    cardHeading: {
        alignItems: 'center',
        width: WIDTH - 20,
        backgroundColor: colors.EXPAND_TITLE,         // color
        borderRadius: 6
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
        fontWeight: '300',
        paddingTop: 6,
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '300',
        textDecorationLine: 'underline',
        //marginBottom: 10,
        marginTop: 10
    },
});