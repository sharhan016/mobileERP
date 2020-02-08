import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Pie from 'react-native-fab-pie';
import MyLabels from './MyLabels';

const width = Dimensions.get('window').width;

export default class PieJS extends React.PureComponent {
  constructor(props) {
    super(props);
    let dashValue = this.props.dashData
    const data = dashValue.map( (d) => {
      let exe = this.props.execute
      if(exe == 1){
      return parseInt(d.GrandTotal) + 1000
      }
      else if(exe == 2){
        return parseInt(d.OSVal) + 1000
      }
      })
    const stockName = dashValue.map( (n) => {return n.CategoryName})
    const colorName = dashValue.map( (c) => { 
      let letters = "0223456285ABCDEE" 
      let color = ''
      for (var i = 0; i < 6; i++) 
       color += letters[(Math.floor(Math.random() * 16))]; 
      return color 
    
    })

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
          <Text style={{ fontSize: 18 }}>{this.props.text} Value</Text>
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
          outerRadius={90} // it was 120
          innerRadius={20}
          data={this.state.pieData}
          animate
        >
        <MyLabels />
        </Pie>
        
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
    width: width - 20
  }
})