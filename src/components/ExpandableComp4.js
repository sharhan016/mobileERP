import React, { Component } from "react";
import { View,Text,StyleSheet,Animated, TouchableOpacity,Touchable, Dimensions} from "react-native";
import Card from './Card';
import CardSection from './CardSection';
//import json from '../screens/data2.json'
import BoxInfo from './BoxInfo';
import colors from "../config/colors";

const WIDTH = Dimensions.get('screen').width;


class ExpandableComp4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            Exist: false
        }
        this.componentHeight = new Animated.Value(90)

        this.PE = this.props.PE
        this.OE = this.props.OE
    }
    componentDidMount() {
        console.log('LOOK Expense Comp4',this.PE,this.OE)
        this.getPurchaseExpense()
        this.getOtherExpenses()
    }

    getPurchaseExpense = () => {
        let jsonData = this.PE
        if(jsonData.length > 1){
            let amount = 0
        const Expense = jsonData.map((d) => {
            const { TransFullName, PayableAmount, ...rest } = d
            let expense = [TransFullName, PayableAmount]
            return expense
        })
        const purchaseExpense = Expense.map((e) => {
            amount = amount + parseInt(e[1])
            return amount
        })
        let length = purchaseExpense.length - 1
        let expenseAmount = purchaseExpense[length]
        this.setState({Exist: true, PExpense: Expense, PEamount: expenseAmount});
        }
        else{
            console.log('Nothing is there in PE')
            this.setState({Exist: false,PExpense: 'No Data', PEamount: 0});
        }
    }

    getOtherExpenses = () => {
        //let jsonData = json
        let data = this.OE
        //let data = jsonData.requestedData.otherPayments
        let arr = []
        const getOtherExpenses = data.map( (n) => {
            let amount = parseInt(n.OB) - parseInt(n.CreditSum) + parseInt(n.DebitSum)
            return arr.push(amount)
        })
        const reducer = (acc, currentValue) => acc + currentValue;
        let otherExpense = arr.reduce(reducer);
        this.setState({OtherExpenseAmount: otherExpense})
        //console.log(arr)
    }



    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
        if(this.state.Exist){
        !this.state.collapsed ? this.onCollapse() : this.onExpand()
        }
        else{
            this.setState({collapsed: true})
        }
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
       console.log('in render expense',this.state)
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
                            <Text style={styles.textStyle}>Total Expense</Text>
                            <Text style={styles.textStyle}>$ {this.state.PEamount}</Text>
                        </View>
                        <View style={{ height: 2 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Expense</Text>
                            <Text style={styles.textStyle}>$ {this.state.OtherExpenseAmount}</Text>
                        </View>
                        <View style={{ height: 20 }}></View>
                        {/* ############ EXPANDABLE SECTION ################### */}
                        {/* {!this.state.collapsed ? <View>
                            {this.state.revenue.map( (e) => 
                                <BoxInfo subtitle='Maybe' label1={e[0]} amount1={e[1]} /> )}
                        </View> : null} */}
                    </Animated.View>
                    </Card>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

export default ExpandableComp4;

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