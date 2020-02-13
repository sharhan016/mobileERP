import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import jsonData from './data.json'

class TestPage2 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
     
    getCash = () => {
        let bankCash = jsonData.requestedData.bankAccountBlock.CashOnBank_tillnow
        const cleanData = bankCash.map((d) => {
            const { LedgerID, LedgerCode, DebitSum, CreditSum, ...rest} = d
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
          console.log('inside if',arr)
          console.log('inside else',newArr)
          for(let j=0; j < arr.length; j++){
            let pdc = arr[j]
            for(let k=0; k < newArr.length; k++){
                let bank = newArr[k]
                if('PDC-'+bank.LedgerName == pdc.LedgerName){
                     bank.OB = parseInt(bank.OB) + parseInt(pdc.OB)
                }
            }
          }
          console.log(newArr[0].OB)
         // return newArr
         // console.log('New_Array',newArr)
          //console.log('Array',arr)

        // const newData = cleanData.map( (d) => {
        //     let str = d.LedgerName
        //     let newStr = str.slice(0,3)
        //     let arr= []
        //     let newArr = []
        //     if(str.slice(0,3) == 'PDC'){
        //         arr.push(str)
        //     }else{
        //         newArr.push(str)
        //     }
        //     console.log('New_Array',newArr)
        //     return arr
        // })
        // console.log(newData)

        
        



        // const OPData = cleanData.filter( (e) => {
        //     let op = e.RowType == 'OP'
        //     return op
        // })
        // const lName = OPData.map( (map) => {
        //     name = map.LedgerName.toString().slice(0, 4)
        //     console.log(name)
        // })
        // console.log(OPData)

        // const MainData = cleanData.filter( (e) => {
        //     return e.RowType == 'Main'
        // })
        // console.log(MainData)

    }
    
    
    
    
    
    
    
    componentDidMount() {
        this.getCash();        
    }

    render() {
        return (
        <View></View>        
        );
    }
}

export default TestPage2;