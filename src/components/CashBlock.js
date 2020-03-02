import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, FlatList, TouchableOpacity, Touchable, Dimensions, ScrollView } from "react-native";
import colors from "../config/colors";
import jsonData from '../screens/data.json'
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-elements';

const WIDTH = Dimensions.get('screen').width - 20;

class CashBlock extends Component {
    constructor(){
        super();
        this.state = {
            collapsed: true,
            json: [],
            ready: new Animated.Value(false)
            //Sales: []
        }
        this.componentHeight = new Animated.Value(16)
        this.upArrowIcon = new Animated.Value(0)
    }
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
        !this.state.collapsed ? this.onCollapse() : this.onExpand()

    }
    // Animated.parallel([
    //     Animated.timing(this.keyboardHeight, {
    //         duration: event.duration,
    //         toValue: 0,
    //     }),
    //     Animated.timing(this.imageHeight, {
    //         duration: event.duration,
    //         toValue: 120,
    //     }),
    // ]).start();
    onExpand = () => {
        Animated.sequence([
            Animated.timing(this.componentHeight, {
                duration: 500,
                toValue: 130
            }),
        Animated.timing(this.upArrowIcon, {
            duration: 200,
            toValue: 0
        })
        ]).start();
        // Animated.timing(this.componentHeight, {
        //     duration: 500,
        //     toValue: 130,
        // }).start();
    }
    onCollapse = () => {
        Animated.sequence([
            Animated.timing(this.componentHeight, {
                duration: 300,
                toValue: 16
            }),
        Animated.timing(this.upArrowIcon, {
            duration: 500,
            delay: 300,
            toValue: 1
        })
        ]).start();
        // Animated.timing(this.componentHeight, {
        //     duration: 500,
        //     toValue: 12
        // }).start();
    }
    componentDidMount() {
        this.getCashInHandAmount();
    } 

    getCashInHandAmount = () => {
        //let json = jsonData.requestedData.cashAccountBlock.CashOnHand_tillnow
        let json = this.props.data
        let arr = []
        const inHand = json.map( (n) => {
            let amount = parseInt(n.OB) - parseInt(n.CreditSum) + parseInt(n.DebitSum)
            return arr.push(amount)
        })
        const reducer = (acc, currentValue ) => acc + currentValue
        let inHandAmount = arr.reduce(reducer);
        let amount = inHandAmount.toFixed(2)
        this.setState({json: json,InhandAmount: amount})
    }

    render() {
        console.log('cashBlock',this.upArrowIcon)
        const downArrow =<Animated.View>
            <Feather 
            name={this.state.collapsed ? 'chevron-down' : 'chevron-up'} 
            size={15}  color={colors.LoginButton} style={[styles.inputIcon]}/></Animated.View>
        const upArrow = <Feather name={'chevron-up'} size={15} style={styles.inputIcon} />
        return (
            <Animated.View style={{height: this.componentHeight}} >

                <TouchableOpacity style={styles.touchable} activeOpacity={.9} onPress={this.toggleExpanded}>
                        <View style={styles.container}>
                        <Text style={styles.headingText}>Cash Pocess</Text>
                        <Text style={styles.valueText}>{'\t'} ${this.state.InhandAmount}</Text>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        {downArrow}
                        </View>
                            <Animated.View style={[{}, { height: this.componentHeight }]}>
                             <FlatList
                            data={this.state.json}
                            style={{marginTop: 10}}
                            renderItem={(data) => {   
                                let name = data.item.LedgerName.slice(5,20)    
                                let amount = parseInt(data.item.OB)
                                let cash = amount.toFixed(2)                  
                                return(
                                    <View>
                                            <View style={styles.horizontalView}>
                                                <Text style={styles.textStyle}>{name}</Text>
                                                <View style={{width: 15}}></View>
                                                <Text style={styles.headingTextStyle}>${cash}</Text>
                                            </View>
                                            {/* <View style={{ height: 1.5 }}></View> */}
                                            <Divider style={{ backgroundColor: 'gray',marginLeft: 20,marginRight: 20 }} />
                                        </View>
                                )
                            }}
                            />
                            {/* <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        {!this.state.ready ? upArrow : null}
                        </View> */}
                            </Animated.View>            
                           {/* </View> */}
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
export default CashBlock;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        //backgroundColor: 'black'
    },
    touchable: {
        //padding: 5,
        //flex: 2,
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'space-between',
        //flexDirection: 'row',
        backgroundColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 5,
        borderRadius: 5,
        width: WIDTH / 2,
        backgroundColor: '#c9dcfc'
    },
    headingText: {
        fontSize: 13,
        color: '#2c2d2e',
        marginTop: 5,
    },
    valueText: {
        paddingTop: 5,
        fontSize: 15,
        color: '#3168cc',
        fontWeight: '700'
    },
    textStyle: {
        fontSize: 14,       
        paddingVertical: 5,
    },
    headingTextStyle: {
        fontSize: 14,
        paddingVertical: 5,
    },
    horizontalView: { 
        flexDirection: 'row',
        paddingVertical: 5,
        justifyContent: 'space-around'
    },
    inputIcon: {
        // position: 'absolute',
        // top: 6,
        // left: 37,
        padding: 0,
        //color: 'transparent'
        //color: '#3168cc'
    },
});