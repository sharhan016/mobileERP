import React, { Component } from "react";
import { View,Text,StyleSheet,Animated, TouchableOpacity,Touchable, Dimensions, ScrollView} from "react-native";
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import json from '../screens/data2.json'
import BoxInfo from '../components/BoxInfo';
import colors from "../config/colors";
import { Divider } from 'react-native-elements';


const WIDTH = Dimensions.get('screen').width;
const SR = 'Sales Revenue';
const TSR = 'Total Sales Revenue';
const OR = 'Other Revenue';
const TOR = 'Total Other Revenue';

class ExpandablePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            revenue: []
            //Sales: []
        }
        this.componentHeight = new Animated.Value(90)
        this.SI = this.props.SI
        this.OR = this.props.OR

    }
    componentDidMount() {

        this.getSalesData()
        this.getOtherRevenueAmount()


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
        this.setState({revenue: Sales, amount: salesAmount});
    }
    getOtherRevenueAmount = () => {
        let jsonData = this.OR
        console.log('in exapnd',jsonData)
        let amount = 0
        const revenueAmount = jsonData.map( (o) => {
            amount = parseInt(o.OB) - parseInt(o.CreditSum) + parseInt(o.DebitSum)
            return amount
        })
        this.setState({otherAmount: revenueAmount });

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
        const Display = this.state.revenue.map( (a) => {
            return(
                <ScrollView>
                <View style={styles.horizontalView}>
            <Text style={styles.textStyle}>{a[0]}</Text>
            <Text style={styles.textStyle}>{a[1]}</Text>
        </View>
        <View style={{ height: 2 }}></View>
        <Divider style={{ backgroundColor: 'gray' }} />
        </ScrollView>
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
                            <Text style={styles.textStyle}>Sales Revenue</Text>
                            <Text style={styles.textStyle}>${this.state.amount}</Text>
                        </View>
                        <View style={{ height: 2 }}></View>
                        <View style={styles.horizontalView}>
                            <Text style={styles.textStyle}>Other Revenue</Text>
                            <Text style={styles.textStyle}>${this.state.otherAmount}</Text>
                        </View>
                        <View style={{ height: 20 }}></View>
                        {/* ############ EXPANDABLE SECTION ################### */}
                        {/* {!this.state.collapsed ? <View>
                            {this.state.revenue.map( (e) => 
                                <BoxInfo subtitle='Maybe' label1={e[0]} amount1={e[1]} /> )}
                        </View> : null} */}
                        {Display}
                    </Animated.View>
                    </Card>
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