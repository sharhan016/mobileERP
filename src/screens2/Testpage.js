import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import jsonData from '../../data';

class Testpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Warehouse', 'OS', 'Transaction', 'CS'],
      // Need to replace tableTitle with index
      tableTitle: ['19/11/19', '19/11/19', '19/11/19', '19/11/19', '19/11/19', '19/11/19', '19/11/19', '19/11/19'],
      //////////////////
      tableData: [
        ['PDC-ACC', '500.0', '0.0'],
        ['BANK-ACC', '250.0', '0.0'],
        ['CASH-ACC', '150.0', '500.0'],
        ['CASH-ACC', '15.0', '50.0'],
        ['BANK-ACC', '250.0', '0.0'],
        ['PDC-ACC', '500.0', '0.0'],
        ['CASH-ACC', '150.0', '500.0'],
        ['BANK-ACC', '250.0', '0.0']
      ],
      isLoading: true,
      newTable: [],
      dataSource: []
    }
  }

  componentDidMount() {  
  }


  render() {
  
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table style={styles.tableStyle} borderStyle={{ borderWidth: .3 }}>
           <Row data={state.tableHead}
            //flexArr={[1, 1, 1]}
            style={styles.head}
            textStyle={styles.text} />

       { jsonData.map((e, index)=>{
          let workOrder1=Object.values(e)
          //workOrder1.shift();
          //console.log('data ', data)
        return(
          <Row
          key={index}
          //flexArr={[1, 1, 1]}
          data={workOrder1}
          style={styles.row}
          textStyle={styles.text}
        />
        )
      })} 
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 5, 
    backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { flex: 1, height: 28, justifyContent: 'center' },
  text: { textAlign: 'center' },
  tableStyle: { 
    // borderBottomRightRadius: 10,
    // borderTopRightRadius: 10,
    // borderRadius: 10
  }
});

export default Testpage;

/*
<Rows
              data={state.tableData}
              flexArr={[1, 1, 1]}
              style={styles.row}
              textStyle={styles.text} />


const prop = 'color'

const newCar = Object.keys(car).reduce((object, key) => {
  if (key !== prop) {
    object[key] = car[key]
  }
  return object
}, {})


*/