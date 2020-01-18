import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Pie from 'react-native-pie';

const PiePage = (props) => {
    return (
        <View styles={styles.container}>
            <View style={styles.pieContainer}>
            <Pie
                radius={100} series={[20, 40, 40]}  colors={['yellow', 'green', 'orange']}
            />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:20,
      //alignItems: 'center',
      //justifyContent: 'flex-end',
      marginTop:30,
    },
    gauge: {
      position: 'absolute',
      width: 140,
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gaugeText: {
      backgroundColor: 'transparent',
      color: '#000',
      fontSize: 24,
    },
    pieContainer: {
        //backgroundColor: '#ddd',
        margin: 10,
        //alignItems: 'flex-end'
    }
  });

export default PiePage;