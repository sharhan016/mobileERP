import React, { Component } from "react";
import { View,Text,StyleSheet,Animated, TouchableOpacity, FlatList, Touchable, Dimensions, ScrollView} from "react-native";
import Card from './Card';
import CardSection from './CardSection';
import json from '../screens/data2.json'
import BoxInfo from './BoxInfo';
import colors from "../config/colors";
import { Divider } from 'react-native-elements';
import Test from '../screens/TestPage'

const WIDTH = Dimensions.get('screen').width;


class ExpandableComp3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            supplierPayments: []
        }
        this.componentHeight = new Animated.Value(90)

        this.SP = this.props.SP
        this.OP = this.props.OP
    }
    componentDidMount() {
        this.getCustomerPaymentData();
     
    }
    getCustomerPaymentData = () => {
        let jsonData = json
        let payments = this.SP
        //let payments = jsonData.requestedData.supplierPayments
        let amount = 0
        //console.log('IN COMP3 ',payments)
        const getLabels = payments.map( (l) => {
            let amount = parseInt(l.OB) - parseInt(l.CreditSum) + parseInt(l.DebitSum)
            if(l.VoucherType != ''){
                if(l.VoucherType == 'CP'){
                    l.VoucherName =  'Cash Payment' 
                    l.PaymentAmount = amount
                }
                if(l.VoucherType == 'QP'){
                    l.VoucherName =  'Cheque Payment' 
                    l.PaymentAmount = amount
                }
                if(l.VoucherType == 'BW'){  
                    l.VoucherName =  'Bank Withdrawal' 
                    l.PaymentAmount = amount
                }
            }
            else{
                console.log('There\'s nothing in payments')
            }
            return l
        })

         this.setState({supplierPayments: payments})
        let post = []
        const getAmount = payments.map( (n) => {
            post.push(n.PaymentAmount)
        })
        const reducer = (acc, currentValue) => acc + currentValue;
        let supAmount = post.reduce(reducer);
        this.setState({SupplierPaymentAmount: supAmount})
        this.getOtherPayments()
        //#TODO: merge similiar fields
    }
    getOtherPayments = () => {
        let jsonData = json
        let data = this.OP
        //let data = jsonData.requestedData.otherPayments
        let arr = []
        const getOtherAmount = data.map( (n) => {
            let amount = parseInt(n.OB) - parseInt(n.CreditSum) + parseInt(n.DebitSum)
            return arr.push(amount)
        })
        const reducer = (acc, currentValue) => acc + currentValue;
        let otherAmount = arr.reduce(reducer);
        this.setState({OtherPaymentAmount: otherAmount})
        //console.log(arr)
    }

 
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
        !this.state.collapsed ? this.onCollapse() : this.onExpand()

      }
      onExpand = () => {
        Animated.timing(this.componentHeight,{
            duration: 1000,
            toValue: 200,
        }).start();
      }
      onCollapse = () => {
        Animated.timing(this.componentHeight,{
            duration: 500,
            toValue: 90
        }).start();
      }
      static navigationOptions = {
        header: null
    }
    
    render() {
       //console.log('in render payments',this.state)
       const Display = this.state.supplierPayments.map( (a, index) => {
        return(
            <ScrollView>
            <View key={index} style={styles.horizontalView}>
        <Text style={styles.textStyle}>{a.VoucherName}</Text>
        <Text style={styles.textStyle}>{a.PaymentAmount}</Text>
    </View>
    <View style={{ height: 2 }}></View>
    <Divider style={{ backgroundColor: 'gray' }} />
    </ScrollView>
        )
    })
        return (
            <Animated.View style={[styles.component ]} >
                
                <TouchableOpacity activeOpacity={.9} onPress={this.toggleExpanded}>
                <View style={{marginBottom: 10}}>
                <Card style={{borderColor: colors.EXPAND_INNER, shadowColor: colors.EXPAND_INNER}}>
                    <CardSection style={{padding: 0}}>
                        <View style={styles.cardHeading}><Text style={styles.title}>{this.props.title}</Text></View>
                    </CardSection>
                    </Card>
                    <Card style={{borderColor: colors.EXPAND_INNER, shadowColor: colors.EXPAND_INNER}}>
                    <Animated.View style={[styles.inCard, { height : this.componentHeight } ]}>
                        <View style={{ height: 2 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Total Payments</Text>
                            <Text style={styles.textStyle}>${this.state.SupplierPaymentAmount}</Text>
                        </View>
                        <View style={{ height: 2 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Payments</Text>
                            <Text style={styles.textStyle}>${this.state.OtherPaymentAmount}</Text>
                        </View>
                        <View style={{ height: 20 }}></View>
                        {/* ############ EXPANDABLE SECTION ################### */}
                        <FlatList
                                    nestedScrollEnabled={true}
                                    data={this.state.supplierPayments}
                                    keyExtractor={(i, index) => {
                                        return index
                                    }}
                                    renderItem={(data) => {
                                        return (<View>
                                            <View style={styles.horizontalView}>
                                                <Text style={styles.textStyle}>{data.item.VoucherName}</Text>
                                                <Text style={styles.textStyle}>{data.item.PaymentAmount}</Text>
                                            </View>
                                            <View style={{ height: 2 }}></View>
                                            <Divider style={{ backgroundColor: 'gray' }} />
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

export default ExpandableComp3;

const styles = StyleSheet.create({
    container: {
       // flex: 1,
        //alignItems: 'center',
    },
    component : {
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
        fontSize: 17,       
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
        width: WIDTH - 50,
        backgroundColor: colors.EXPAND_TITLE,         // color
        borderRadius: 6
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
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