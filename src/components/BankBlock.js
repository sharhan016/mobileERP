import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, FlatList, TouchableOpacity, Touchable, Dimensions, ScrollView } from "react-native";
import colors from "../config/colors";
import Feather from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-elements';

const WIDTH = Dimensions.get('screen').width - 20;

class BankBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
            data: props.data,
            InBankAmount: 0
        }
        this.componentHeight = new Animated.Value(16)
    }
    componentDidMount() {
        this.getCash();
    }
    getCash = () => {
        let bankCash = this.props.data     
        const cleanData = bankCash.map((d) => {
            const { LedgerCode, DebitSum, CreditSum, ...rest} = d
            return rest;
          })
        let arr= []
        let newArr = []
          for(let i=0; i < cleanData.length; i++){
              let bank = cleanData[i]
              let str = bank.LedgerName
              if(str.slice(0,3) == 'PDC')
              {
                   arr.push(bank)
                }
              else{
                   newArr.push(bank)
                }
          }
          for(let j=0; j < arr.length; j++){
            let pdc = arr[j]
            for(let k=0; k < newArr.length; k++){
                let bank = newArr[k]
                if('PDC-'+bank.LedgerName == pdc.LedgerName){
                     bank.OB = parseInt(bank.OB) + parseInt(pdc.OB)
                }
            }
          }
          if(newArr.length == 1){
            this.setState({BankCash: newArr, InBankAmount: newArr[0].OB})
        }
          //this.setState({BankCash: newArr})
    }
    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
        !this.state.collapsed ? this.onCollapse() : this.onExpand()

    }
    onExpand = () => {
        Animated.timing(this.componentHeight, {
            duration: 500,
            toValue: 130,
        }).start();
    }
    onCollapse = () => {
        Animated.timing(this.componentHeight, {
            duration: 300,
            toValue: 16
        }).start();
    }
   
    render() {
        const downArrow = <Feather name={this.state.collapsed ? 'chevron-down' : 'chevron-up'} size={15} style={styles.inputIcon} />
        const { InBankAmount} = this.state
        let bankAmount = InBankAmount.toFixed(2)
        return (
            <Animated.View style={{height: this.componentHeight}} >

                <TouchableOpacity style= {styles.touchable} activeOpacity={.9} onPress={this.toggleExpanded}>
               
                    <View style={styles.container}>
                        <Text style={styles.headingText}>Bank Amount</Text>
                        <Text style={styles.valueText}>{'\t'} ${bankAmount}</Text>
                        </View>
                        <View style={{alignItems: 'center', justifyContent: 'center',}}>
                        {downArrow}
                        </View>
                        {/* <View style={{ height: 15 }}></View> */}
                            <Animated.View style={[{}, { height: this.componentHeight }]}>
                             <FlatList
                            data={this.state.BankCash}
                            style={{marginTop: 10}}
                            renderItem={(data) => {     
                                let name = data.item.LedgerName.slice(5,20)      
                                let ob = data.item.OB
                                let amount = ob.toFixed(2)                  
                                return(
                                    <View>
                                            <View style={styles.horizontalView}>
                                                <Text style={styles.textStyle}>{name}</Text>
                                                <View style={{width: 15}}></View>
                                                <Text style={styles.headingTextStyle}>${amount}</Text>
                                            </View>
                                            {/* <View style={{ height: 1.5 }}></View> */}
                                            <Divider style={{ backgroundColor: 'gray',marginLeft: 20,marginRight: 20 }} />
                                        </View>
                                )
                            }}
                            />

                              
                
                            
                            </Animated.View>
               
                           
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
export default BankBlock;

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
        //height: 40,
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 10,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'space-between',
        //flexDirection: 'row',
        backgroundColor: 'white',
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
        //paddingLeft: 10,
        //paddingRight: 15,
        paddingVertical: 5,
        justifyContent: 'space-around'
    },
    inputIcon: {
        padding: 0,

    },
});