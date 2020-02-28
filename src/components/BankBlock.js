import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, FlatList, TouchableOpacity, Touchable, Dimensions, ScrollView } from "react-native";
import colors from "../config/colors";
import { Divider } from 'react-native-elements';

const WIDTH = Dimensions.get('screen').width - 20;

class BankBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
            data: props.data
        }
        this.componentHeight = new Animated.Value(10)
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
            duration: 1000,
            toValue: 130,
        }).start();
    }
    onCollapse = () => {
        Animated.timing(this.componentHeight, {
            duration: 500,
            toValue: 10
        }).start();
    }
   
    render() {
        return (
            <Animated.View style={{height: this.componentHeight}} >

                <TouchableOpacity activeOpacity={.9} onPress={this.toggleExpanded}>
                    <View style={styles.touchable}>
                    <View style={styles.container}>
                        <Text style={styles.headingText}>Bank Amount</Text>
                        <Text style={styles.valueText}>{'\t'} ${this.state.InBankAmount}</Text>
                        </View>
                        {/* <View style={{ height: 15 }}></View> */}
                            <Animated.View style={[{}, { height: this.componentHeight }]}>
                             <FlatList
                            data={this.state.BankCash}
                            style={{marginTop: 10}}
                            renderItem={(data) => {     
                                let name = data.item.LedgerName.slice(5,20)                        
                                return(
                                    <View>
                                            <View style={styles.horizontalView}>
                                                <Text style={styles.textStyle}>{name}</Text>
                                                <View style={{width: 15}}></View>
                                                <Text style={styles.headingTextStyle}>${data.item.OB}</Text>
                                            </View>
                                            {/* <View style={{ height: 1.5 }}></View> */}
                                            <Divider style={{ backgroundColor: 'gray',marginLeft: 20,marginRight: 20 }} />
                                        </View>
                                )
                            }}
                            />

                              
                
                            
                            </Animated.View>
               
                            </View>
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
        padding: 5,
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
        fontSize: 14,
        color: '#2c2d2e',
        marginTop: 5,
    },
    valueText: {
        paddingTop: 5,
        fontSize: 16,
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
});