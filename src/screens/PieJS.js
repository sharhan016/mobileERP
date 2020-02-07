import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Pie from 'react-native-fab-pie';
import MyLabels from './MyLabels';

export default class PieJS extends React.PureComponent {
  constructor(props) {
    super(props);
    let dashValue = this.props.dashData
    const data = dashValue.map( (d) => { return parseInt(d.GrandTotal) + 1000})
    console.log('DATA IN PIE',data)
    const stockName = dashValue.map( (n) => {return n.CategoryName})
    const colorName = dashValue.map( (c) => { return 'A44E4C' })
    const colors = ['A40E4C', '2C2C54', 'ACC3A6', 'F5D6BA', '6A6FEF', 'ACC3A6', '2C2C54'];

    const pieData = data
      .filter(value => value > 0)
      .map((value, index) => {
        const toRet = {
          value,
          title: `${data[index]}`,
          color: `#${colorName[index]}`,
          help: `${stockName[index]}`,      // Add extra parameter here
          key: `pie-${index}`,
        };
        return toRet;
      });

    this.state = {
      pieData,
    };
  }

  componentDidMount() {
    this.pie.current.animate();
  }

  animate = () => {
    this.pie.current.reset().then(this.pie.current.animate);
  };

  pie = React.createRef();

  render() {
    return (
      <View 
      style={styles.pieContainer} >
          <TouchableOpacity onPress={this.animate}
          style={{  alignItems: 'center'  }} >
          <Text style={{ fontSize: 30 }}>Department Wise</Text>
          <Text style={{ fontSize: 18 }}>Stock Value</Text>
        </TouchableOpacity>
        <Pie
          ref={this.pie}
          containerStyle={{
            flexDirection: 'row',
            //backgroundColor: 'white',
            justifyContent: 'space-between',
            //marginVertical: 20,
          }}
          pieStyle={{
            width: 260, // it was 260
            height: 260,
            flex: 1,
          }}
          outerRadius={110} // it was 120
          innerRadius={25}
          data={this.state.pieData}
          animate
        >
        <MyLabels />
        </Pie>
        
        {/* <Button title="animate" onPress={this.animate} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pieContainer: {
    marginVertical: 10,
    //marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
})