import React, { Component } from "react";
import { View,Text,StyleSheet,Animated, TouchableOpacity,Touchable, Dimensions, FlatList, ScrollView} from "react-native";
import Card from './Card';
import CardSection from './CardSection';
import json from '../screens/data2.json'
import BoxInfo from './BoxInfo';
import colors from "../config/colors";
import { Divider } from 'react-native-elements';

const WIDTH = Dimensions.get('screen').width;


class ExpandableComp2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            receipt: []
        }
        this.componentHeight = new Animated.Value(90)
 
        this.OR = this.props.OR
        this.CR = this.props.CR
    
    }
    componentDidMount() {
        //console.log('inside Exapndable page',this.data)
        this.getCustomerReceiptData()
        //console.log('LOOK Receipts Comp2',this.CR,this.OR)
     
    }
    getCustomerReceiptData = () => {
        let jsonData = json
        let receipts = this.CR
        // let receipts = jsonData.requestedData.customerReciepts
        let amount = 0
        // for(let i=0; i < jsonData.length; i++){
        //     console.log('This is',jsonData[i])
        // }
        const getLabels = receipts.map( (l) => {
            let amount = parseInt(l.OB) - parseInt(l.CreditSum) + parseInt(l.DebitSum)
            if(l.VoucherType != ''){
                if(l.VoucherType == 'CR'){
                    l.VoucherName =  'Cash Receipt' 
                    l.ReceiptAmount = amount
                }
                if(l.VoucherType == 'QR'){
                    l.VoucherName =  'Cheque Receipt' 
                    l.ReceiptAmount = amount
                }
                if(l.VoucherType == 'BD'){
                    l.VoucherName =  'Bank Deposit' 
                    l.ReceiptAmount = amount
                }
            }
            else{
                console.log('There\'s nothing in receipts')
            }
            return l
        })

        this.setState({receipt: receipts})
        let post = []
        const getAmount = receipts.map( (n) => {
            post.push(n.ReceiptAmount)
        })
        const reducer = (acc, currentValue) => acc + currentValue;
        let recAmount = post.reduce(reducer);
        this.setState({ReceiptAmount: recAmount})
        this.getOtherReceipts()
        //#TODO: merge similiar fields
    }
    getOtherReceipts = () => {
        let jsonData = json
        let data = this.OR
        //let data = jsonData.requestedData.otherReciepts
        let arr = []
        const getOtherAmount = data.map( (n) => {
            let amount = parseInt(n.OB) - parseInt(n.CreditSum) + parseInt(n.DebitSum)
            return arr.push(amount)
        })
        const reducer = (acc, currentValue) => acc + currentValue;
        let otherAmount = arr.reduce(reducer);
        this.setState({OtherReceiptAmount: otherAmount})
        //console.log(arr)
    }


    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
        !this.state.collapsed ? this.onCollapse() : this.onExpand()

      }
      onExpand = () => {
        Animated.timing(this.componentHeight,{
            duration: 1000,
            toValue: 300,
        }).start();
      }
      onCollapse = () => {
        Animated.timing(this.componentHeight,{
            duration: 100,
            toValue: 90
        }).start();
      }
      static navigationOptions = {
        header: null
    }
    
    render() {
        console.log('in render',this.state)
        const Display = this.state.receipt.map( (a) => {
            return(
                <View>
                <View style={styles.horizontalView}>
            <Text style={styles.textStyle}>{a.VoucherName}</Text>
            <Text style={styles.textStyle}>{a.ReceiptAmount}</Text>
        </View>
        <View style={{ height: 2 }}></View>
        <Divider style={{ backgroundColor: 'blue' }} />
        </View>
            )
        })
        return (
            <Animated.View style={[styles.component ]} >
                
                <TouchableOpacity activeOpacity={.9} onPress={this.toggleExpanded}>
    
                    <Card>
                    <CardSection style={{padding: 0}}>
                        <View style={styles.cardHeading}><Text style={styles.title}>{this.props.title}</Text></View>
                    </CardSection>
                    <Animated.View style={[styles.inCard, { height : this.componentHeight } ]}>
                        <View style={{ height: 2 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Customer Receipt</Text>
                            <Text style={styles.textStyle}>$ {this.state.ReceiptAmount}</Text>
                        </View>
                        <View style={{ height: 2 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Receipt</Text>
                            <Text style={styles.textStyle}>$ {this.state.OtherReceiptAmount}</Text>
                        </View>
                        <View style={{ height: 10 }}></View>
                        {/* ############ EXPANDABLE SECTION ################### */}
                       {Display}
                    
                        
                    </Animated.View>
                    </Card>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default ExpandableComp2;

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
        backgroundColor: colors.MISCHKA,
        paddingLeft: 10,
        height: 80,
        borderRadius: 1
    },
    textStyle: {
        fontSize: 17,
        paddingVertical: 5
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
        backgroundColor: colors.SILVER,
        borderRadius: 2
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
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